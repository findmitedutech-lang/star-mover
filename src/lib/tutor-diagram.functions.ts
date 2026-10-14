import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const IMAGE_MODEL = "openai/gpt-image-2.5-sunburst";
const BUCKET = "tutor-diagrams";
const URL_TTL = 60 * 60 * 24 * 7;

async function hashOf(text: string) {
  const bytes = new TextEncoder().encode(text.trim().toLowerCase().replace(/\s+/g, " "));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Returns a labelled textbook illustration for Ama's explanation.
 * Each picture is drawn once and then shared from storage with every student.
 */
export const drawTutorPicture = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ description: z.string().min(3).max(600) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const path = `${await hashOf(data.description)}.png`;
    const store = supabaseAdmin.storage.from(BUCKET);

    const cached = await store.createSignedUrl(path, URL_TTL);
    if (cached.data?.signedUrl) return { url: cached.data.signedUrl };

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Pictures are not set up yet");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: `Clean educational textbook illustration for a Ghanaian secondary school student: ${data.description}. White background, clear outlines, soft flat colours, neat English labels with pointer lines, accurate science, no decoration, no watermark.`,
        size: "1024x1024",
        quality: "low",
      }),
    });
    if (res.status === 429) throw new Error("Too many students right now. Try the picture again in a moment.");
    if (res.status === 402 || res.status === 403) throw new Error("Pictures are paused for now. Please tell the FindMit team.");
    if (!res.ok) throw new Error("Could not draw this picture right now");
    const body = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = body.data?.[0]?.b64_json;
    if (!b64) throw new Error("Could not draw this picture right now");

    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const up = await store.upload(path, bytes, { contentType: "image/png", upsert: true });
    if (up.error) return { url: `data:image/png;base64,${b64}` };
    const signed = await store.createSignedUrl(path, URL_TTL);
    return { url: signed.data?.signedUrl ?? `data:image/png;base64,${b64}` };
  });
