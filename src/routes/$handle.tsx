import { useEffect, useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, ChevronLeft, Home as HomeIcon, IdCard, Loader2, MapPin, Navigation, Phone, ShieldAlert, Store, Users } from "lucide-react";
import policeCrest from "@/assets/ghana-police-crest.png.asset.json";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { savePendingNav } from "@/lib/share-location";
import { categoryEmoji, categoryLabel, isPoliceShop, normaliseHandle, shopPhotoUrl } from "@/lib/shops";

export const Route = createFileRoute("/$handle")({
  beforeLoad: ({ params }) => {
    if (!decodeURIComponent(params.handle).startsWith("@")) throw notFound();
  },
  head: ({ params }) => {
    const h = normaliseHandle(decodeURIComponent(params.handle));
    return {
      meta: [
        { title: `@${h} — Shop on FindMit` },
        { name: "description", content: `Visit @${h} on FindMit: see products, call to order and get directions.` },
        { property: "og:title", content: `@${h} — Shop on FindMit` },
        { property: "og:description", content: `See products, call to order and get live directions to @${h}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: StorefrontPage,
});

type Shop = {
  id: string;
  handle: string;
  name: string;
  category: string;
  phone: string;
  landmark: string | null;
  description: string | null;
  lat: number | null;
  lng: number | null;
  photo_url: string | null;
};
type Product = { id: string; name: string; description: string | null; price_ghc: number; photo_url: string | null; is_available: boolean };
const db = supabase as unknown as { from: (t: string) => any };

function StorefrontPage() {
  const { handle } = Route.useParams();
  const h = normaliseHandle(decodeURIComponent(handle));
  const { session } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [shop, setShop] = useState<Shop | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    let alive = true;
    void (async () => {
      // Only paid, unexpired shops are visible to customers.
      const { data } = await db
        .from("shops")
        .select("id, handle, name, category, phone, landmark, description, lat, lng, photo_url, subscription_status, subscription_expires_at")
        .eq("handle", h)
        .eq("subscription_status", "active")
        .gt("subscription_expires_at", new Date().toISOString())
        .maybeSingle();
      if (!alive) return;
      if (!data) return setState("missing");
      const s = data as Shop;
      setShop(s);
      setState("ready");
      setCover(await shopPhotoUrl(s.photo_url));
      const { data: list } = await db.from("shop_products").select("*").eq("shop_id", s.id).order("sort_order").order("created_at");
      const ps = (list ?? []) as Product[];
      if (!alive) return;
      setProducts(ps);
      const urls = await Promise.all(ps.map((p) => shopPhotoUrl(p.photo_url)));
      if (alive) setThumbs(Object.fromEntries(ps.map((p, i) => [p.id, urls[i] ?? null])));
    })();
    return () => {
      alive = false;
    };
  }, [h]);

  if (state === "loading")
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </main>
    );

  if (state === "missing" || !shop)
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <Store className="size-10 text-muted-foreground" />
        <h1 className="font-display text-xl font-bold">@{h} is not open</h1>
        <p className="max-w-xs text-sm text-muted-foreground">This shop doesn't exist yet or its yearly registration has not been paid.</p>
        <Button onClick={() => void navigate({ to: "/my-shop" })}>Register your own shop</Button>
      </main>
    );

  const directions = () => {
    if (shop.lat == null || shop.lng == null) return;
    savePendingNav({ lat: shop.lat, lng: shop.lng, label: shop.name, landmark: shop.landmark ?? undefined });
    void navigate(session ? { to: "/chat", search: { c: undefined } } : { to: "/auth" });
  };

  const police = isPoliceShop(shop);
  const tel = `tel:${shop.phone.replace(/\s/g, "")}`;
  const avatar = police ? policeCrest.url : cover;
  const callLabel = police ? `Call Emergency ${shop.phone}` : `Call Shop (${shop.phone})`;
  const policeServices = [
    { label: "Report Theft", Icon: ShieldAlert, tone: "text-orange-400" },
    { label: "Domestic Case", Icon: HomeIcon, tone: "text-rose-400" },
    { label: "Lost ID", Icon: IdCard, tone: "text-sky-400" },
    { label: "Community Help", Icon: Users, tone: "text-emerald-400" },
  ];

  return (
    <main className="min-h-dvh bg-background pb-28">
      <header className="sticky top-0 z-10 flex items-center border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <button type="button" aria-label="Back" onClick={() => window.history.length > 1 ? window.history.back() : void navigate({ to: "/" })}>
          <ChevronLeft className="size-6" />
        </button>
        <p className="flex-1 text-center font-display text-base font-semibold">FindMit</p>
        <span className="size-6" />
      </header>

      <section className="mx-auto max-w-lg px-4 pt-5">
        <div className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm">
          <div className={`size-24 shrink-0 overflow-hidden rounded-full ${police ? "" : "border border-border bg-muted"}`}>
            {avatar ? (
              <img src={avatar} alt={`${shop.name} logo`} className={`size-full ${police ? "object-contain" : "object-cover"}`} />
            ) : (
              <div className="flex size-full items-center justify-center text-4xl">{categoryEmoji(shop.category)}</div>
            )}
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <h1 className="flex items-center gap-1.5 font-display text-lg font-bold leading-tight">
              <span className="min-w-0 break-words">{shop.name}</span>
              <BadgeCheck className={`size-5 shrink-0 ${police ? "text-sky-400" : "text-wa-green"}`} aria-label="Verified" />
            </h1>
            <p className="truncate text-sm text-muted-foreground">@{shop.handle}</p>
            <p className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs">
              <MapPin className="size-3.5 shrink-0" /> <span className="truncate">{shop.landmark || categoryLabel(shop.category)}</span>
            </p>
            <Button asChild size="sm" className="w-full rounded-full">
              <a href={tel}>
                <Phone className="size-4" /> <span className="truncate">{callLabel}</span>
              </a>
            </Button>
          </div>
        </div>

        {shop.description && !police ? <p className="mt-3 text-sm text-muted-foreground">{shop.description}</p> : null}

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Services</h2>
          {!police ? <span className="text-sm text-muted-foreground">Available now</span> : null}
        </div>

        {police ? (
          <>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {policeServices.map(({ label, Icon, tone }) => (
                <a key={label} href={tel} className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl bg-card p-3 text-center shadow-sm">
                  <Icon className={`size-14 ${tone}`} strokeWidth={1.75} />
                  <span className="text-sm font-semibold">{label}</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Average response time: ~5 min • Open 24/7</p>
          </>
        ) : products.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No services listed yet — call to ask.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className={`rounded-2xl border border-border bg-card p-2.5 shadow-sm ${p.is_available ? "" : "opacity-60"}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  {thumbs[p.id] ? (
                    <img src={thumbs[p.id] ?? ""} alt={p.name} className="size-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-3xl">{categoryEmoji(shop.category)}</div>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 font-display text-sm font-bold">{p.name}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px]">
                  <span className={`size-2 rounded-full ${p.is_available ? "bg-wa-green" : "bg-muted-foreground"}`} />
                  {p.is_available ? "Available" : "Sold out"}
                </span>
                <p className="mt-1 font-display text-base font-bold text-wa-green">GH₵ {Number(p.price_ghc).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button asChild size="lg" className="flex-1 rounded-2xl">
            <a href={tel}>
              <Phone className="size-5" /> {police ? "Tap to Call Police" : `Tap to Call ${shop.name}`}
            </a>
          </Button>
          {shop.lat != null ? (
            <Button variant="outline" size="lg" className="rounded-2xl" onClick={directions} aria-label="Directions">
              <Navigation className="size-5" />
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
