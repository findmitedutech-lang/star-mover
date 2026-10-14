import { useEffect, useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, Loader2, MapPin, Navigation, Phone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { savePendingNav } from "@/lib/share-location";
import { categoryEmoji, normaliseHandle, shopPhotoUrl } from "@/lib/shops";

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

  return (
    <main className="min-h-dvh bg-background pb-28">
      <div className="relative h-52 w-full bg-muted">
        {cover ? (
          <img src={cover} alt={`${shop.name} shop front`} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-6xl">{categoryEmoji(shop.category)}</div>
        )}
      </div>
      <section className="mx-auto max-w-lg px-4 pt-4">
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold">
          {shop.name} <BadgeCheck className="size-5 text-wa-green" aria-label="Verified shop" />
        </h1>
        <p className="text-sm text-muted-foreground">@{shop.handle}</p>
        {shop.landmark ? (
          <p className="mt-2 flex items-center gap-1 text-sm">
            <MapPin className="size-4 text-wa-green" /> {shop.landmark}
          </p>
        ) : null}
        {shop.description ? <p className="mt-2 text-sm">{shop.description}</p> : null}

        <h2 className="mt-6 font-display text-base font-bold">Products & services</h2>
        {products.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No products listed yet — call the shop to order.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className={`overflow-hidden rounded-2xl bg-card shadow-sm ${p.is_available ? "" : "opacity-60"}`}>
                <div className="aspect-square bg-muted">
                  {thumbs[p.id] ? (
                    <img src={thumbs[p.id] ?? ""} alt={p.name} className="size-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-3xl">{categoryEmoji(shop.category)}</div>
                  )}
                </div>
                <div className="p-2">
                  <p className="line-clamp-2 text-sm font-medium">{p.name}</p>
                  <p className="text-sm font-bold text-wa-green">GH₵ {Number(p.price_ghc).toFixed(2)}</p>
                  {!p.is_available ? <p className="text-xs text-muted-foreground">Sold out</p> : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button asChild className="flex-1">
            <a href={`tel:${shop.phone.replace(/\s/g, "")}`}>
              <Phone className="size-4" /> Call to order
            </a>
          </Button>
          {shop.lat != null ? (
            <Button variant="outline" className="flex-1" onClick={directions}>
              <Navigation className="size-4" /> Directions
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
