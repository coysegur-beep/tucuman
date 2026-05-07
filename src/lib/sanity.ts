import { createClient, type SanityClient } from "@sanity/client";

/* ─────────────── Config ─────────────── */

const projectId = import.meta.env.SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.SANITY_DATASET as string | undefined) ?? "production";
const apiVersion = (import.meta.env.SANITY_API_VERSION as string | undefined) ?? "2024-03-15";
const token = (import.meta.env.SANITY_TOKEN as string | undefined) || undefined;
const isDev = Boolean(import.meta.env.DEV);

export const HAS_SANITY = Boolean(projectId);

// useCdn: false en dev (queremos ver cambios al toque) y cuando hay token
// (drafts/auth bypass al CDN). En prod sin token usamos el CDN.
const useCdn = !isDev && !token;

export const sanityClient: SanityClient | null = HAS_SANITY
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn,
      token,
      perspective: "published",
    })
  : null;

/* ─────────────── Backend decision ───────────────
 * Una sola query al inicio del build para detectar si Sanity tiene contenido.
 * Si el dataset está vacío o la conexión falla, todo el sitio cae a sample
 * data en bloque — sin spammear warnings por cada query individual. */

type Backend = "sanity" | "sample";

let backendCache: Backend | null = null;
let backendPromise: Promise<Backend> | null = null;

export async function getBackend(): Promise<Backend> {
  if (backendCache) return backendCache;
  if (backendPromise) return backendPromise;
  if (!sanityClient) {
    backendCache = "sample";
    return "sample";
  }
  backendPromise = sanityClient
    .fetch<number>(`count(*[_type=="article"])`)
    .then(
      (count): Backend => {
        const result: Backend = count > 0 ? "sanity" : "sample";
        if (result === "sample") {
          console.warn(
            "[sanity] dataset has 0 articles — using sample data for this build",
          );
        }
        backendCache = result;
        return result;
      },
      (err: Error): Backend => {
        console.warn(
          `[sanity] connection failed (${err.message}) — using sample data`,
        );
        backendCache = "sample";
        return "sample";
      },
    );
  return backendPromise;
}

/* ─────────────── groqFetch with promise-dedup cache ───────────────
 * Astro genera páginas en serie pero `getStaticPaths` puede dispararse
 * en paralelo con la hidratación de páginas que comparten queries. Cacheamos
 * la PROMESA (no el valor resuelto) — dos callers concurrentes con la misma
 * query+params reciben la misma promise in-flight, sin race. */

const queryCache = new Map<string, Promise<unknown>>();

export async function groqFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  const key = `${query}::${JSON.stringify(params)}`;
  const cached = queryCache.get(key);
  if (cached) return cached as Promise<T | null>;

  const promise = sanityClient
    .fetch<T>(query, params)
    .catch((err: Error) => {
      console.warn(`[sanity] query error: ${err.message}`);
      return null;
    });
  queryCache.set(key, promise);
  return promise as Promise<T | null>;
}

/* ─────────────── Image URL builder ─────────────── */

export const IMAGE_PRESETS = {
  hero: { w: 1280, h: 720 },
  og: { w: 1200, h: 630 },
  thumb: { w: 400, h: 225 },
  avatar: { w: 240, h: 240 },
  "avatar-sm": { w: 160, h: 160 },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

interface UrlForOpts {
  preset?: ImagePreset;
  w?: number;
  h?: number;
}

/** Construye URLs de imagen para Sanity CDN o Unsplash (sample data).
 * Para otros hosts devuelve la URL tal cual. */
export function urlFor(
  source: { url: string } | string | null | undefined,
  opts: UrlForOpts = {},
): string {
  if (!source) return "";
  const raw = typeof source === "string" ? source : source.url;
  if (!raw) return "";

  const dims = opts.preset
    ? IMAGE_PRESETS[opts.preset]
    : { w: opts.w, h: opts.h };
  if (!dims.w && !dims.h) return raw;

  if (raw.includes("cdn.sanity.io")) {
    const [base] = raw.split("?");
    const p = new URLSearchParams();
    if (dims.w) p.set("w", String(dims.w));
    if (dims.h) p.set("h", String(dims.h));
    p.set("fit", "crop");
    p.set("auto", "format");
    p.set("q", "80");
    return `${base}?${p.toString()}`;
  }

  if (raw.includes("images.unsplash.com")) {
    let u = raw;
    if (dims.w) {
      u = /([?&])w=\d+/.test(u)
        ? u.replace(/([?&])w=\d+/, `$1w=${dims.w}`)
        : `${u}${u.includes("?") ? "&" : "?"}w=${dims.w}`;
    }
    if (dims.h) {
      u = /([?&])h=\d+/.test(u)
        ? u.replace(/([?&])h=\d+/, `$1h=${dims.h}`)
        : `${u}&h=${dims.h}`;
    }
    return u;
  }

  return raw;
}
