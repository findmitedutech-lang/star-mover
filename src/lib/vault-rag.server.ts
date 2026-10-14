/** Server-only GES vault retrieval. Never imported from client code. */

const EMBED_MODEL = "openai/text-embedding-3-small";

export interface VaultChunk {
  id: string;
  subject: string;
  grade: string;
  strand: string | null;
  sub_strand: string | null;
  indicator: string | null;
  content: string;
  source_text: string | null;
  source_type: string;
  similarity: number;
}

export interface VaultRowLike {
  subject: string;
  grade: string;
  strand?: string | null | undefined;
  sub_strand?: string | null | undefined;
  indicator?: string | null | undefined;
  content: string;
}

/** Turns text into the number list the vault search uses to find close matches. */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("The vault search is not set up yet");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBED_MODEL, input: texts }),
  });
  if (res.status === 429) throw new Error("Too many requests right now. Try again in a moment.");
  if (res.status === 402) throw new Error("The vault has run out of credit. Please top up.");
  if (!res.ok) throw new Error("The vault search could not run right now");
  const body = (await res.json()) as { data?: { embedding: number[] }[] };
  const list = body.data ?? [];
  if (list.length !== texts.length) throw new Error("The vault search could not run right now");
  return list.map((d) => d.embedding);
}

export function rowText(r: VaultRowLike) {
  return `${r.indicator ?? ""} ${r.strand ?? ""} ${r.sub_strand ?? ""} | ${r.subject} ${r.grade} | ${r.content}`;
}

/** The only information source Ama may use for JHS students. */
export async function searchVault(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  question: string,
  opts?: { grade?: string | null; subject?: string | null; count?: number },
): Promise<VaultChunk[]> {
  let embedding: number[] | null = null;
  try {
    embedding = (await embedTexts([question]))[0] ?? null;
  } catch {
    embedding = null;
  }
  const { data, error } = await supabase.rpc("match_vault", {
    query_embedding: embedding ? JSON.stringify(embedding) : null,
    query_text: question,
    match_level: "jhs",
    match_grade: opts?.grade ?? null,
    match_count: opts?.count ?? 3,
  });
  if (error) return [];
  return ((data ?? []) as VaultChunk[]).filter((c) => (c.similarity ?? 0) > 0);
}

/** Formats vault chunks as the grounding block placed in Ama's prompt. */
export function vaultContext(chunks: VaultChunk[]) {
  if (chunks.length === 0) return "";
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.subject} ${c.grade} — ${c.strand ?? ""}${c.sub_strand ? " / " + c.sub_strand : ""}\nIndicator ${c.indicator ?? "-"}: ${c.content}${c.source_text ? `\nSource: ${c.source_text}` : ""}`,
    )
    .join("\n\n");
}
