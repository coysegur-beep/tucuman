import type {
  AuthorSocial,
  CategorySlug,
  ResolvedArticle,
} from "./types";
import { getBackend, groqFetch } from "./sanity";
import { portableTextToHtml } from "./portable-text";
import * as sample from "~/data/sample-articles";

/* ─────────────── Fallback flag ─────────────── */

const FALLBACK_TO_SAMPLE =
  String(import.meta.env.SANITY_FALLBACK_TO_SAMPLE ?? "true").toLowerCase() !==
  "false";

/* ─────────────── GROQ projections ─────────────── */

const CARD_PROJECTION = `{
  "slug": slug.current,
  titulo,
  kicker,
  copete,
  tags,
  fechaPublicacion,
  fechaActualizacion,
  esDestacada,
  esCoverDelDia,
  tiempoLectura,
  "imagenPrincipal": {
    "url": imagenPrincipal.asset->url,
    "alt": imagenPrincipal.alt,
    "caption": imagenPrincipal.caption
  },
  "categoria": categoria->{
    "slug": slug.current,
    nombre,
    descripcion,
    colorToken,
    colorHex,
    orden
  },
  "autor": autor->{
    "slug": slug.current,
    nombre,
    cargo,
    bio,
    "foto": foto.asset->url,
    redes
  }
}`;

const FULL_PROJECTION = `{
  "slug": slug.current,
  titulo,
  kicker,
  copete,
  tags,
  fechaPublicacion,
  fechaActualizacion,
  esDestacada,
  esCoverDelDia,
  tiempoLectura,
  "body": body,
  "imagenPrincipal": {
    "url": imagenPrincipal.asset->url,
    "alt": imagenPrincipal.alt,
    "caption": imagenPrincipal.caption
  },
  "categoria": categoria->{
    "slug": slug.current,
    nombre,
    descripcion,
    colorToken,
    colorHex,
    orden
  },
  "autor": autor->{
    "slug": slug.current,
    nombre,
    cargo,
    bio,
    "foto": foto.asset->url,
    redes
  }
}`;

/* ─────────────── Raw → ResolvedArticle mapping ─────────────── */

interface RawCategoria {
  slug: CategorySlug;
  nombre: string;
  descripcion: string;
  colorToken: CategorySlug;
  colorHex: string;
  orden: number;
}

interface RawAutor {
  slug: string;
  nombre: string;
  cargo: string;
  bio: string;
  foto: string;
  redes?: AuthorSocial;
}

interface RawArticle {
  slug: string;
  titulo: string;
  kicker?: string;
  copete: string;
  tags?: string[];
  fechaPublicacion: string;
  fechaActualizacion?: string;
  esDestacada?: boolean;
  esCoverDelDia?: boolean;
  tiempoLectura?: number;
  body?: unknown[];
  imagenPrincipal: { url: string; alt: string; caption?: string };
  categoria: RawCategoria;
  autor: RawAutor;
}

function mapSanityArticle(raw: RawArticle): ResolvedArticle {
  return {
    slug: raw.slug,
    titulo: raw.titulo,
    kicker: raw.kicker,
    copete: raw.copete,
    imagenPrincipal: raw.imagenPrincipal,
    autorSlug: raw.autor.slug,
    categoriaSlug: raw.categoria.slug,
    tags: raw.tags ?? [],
    fechaPublicacion: raw.fechaPublicacion,
    fechaActualizacion: raw.fechaActualizacion,
    esDestacada: raw.esDestacada ?? false,
    esCoverDelDia: raw.esCoverDelDia ?? false,
    tiempoLectura: raw.tiempoLectura ?? 4,
    contenidoHtml: raw.body ? portableTextToHtml(raw.body) : undefined,
    autor: {
      slug: raw.autor.slug,
      nombre: raw.autor.nombre,
      cargo: raw.autor.cargo,
      bio: raw.autor.bio,
      foto: raw.autor.foto,
      redes: raw.autor.redes,
    },
    categoria: raw.categoria,
    url: `/${raw.categoria.slug}/${raw.slug}`,
  };
}

function mapMany(raws: RawArticle[] | null | undefined): ResolvedArticle[] {
  if (!Array.isArray(raws)) return [];
  return raws.map(mapSanityArticle);
}

/* ─────────────── Public API (mirrors sample-articles.ts) ─────────────── */

export async function getCoverDelDia(): Promise<ResolvedArticle> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getCoverDelDia();

  const raw = await groqFetch<RawArticle>(
    `*[_type=="article" && esCoverDelDia==true][0]${FULL_PROJECTION}`,
  );
  if (raw) return mapSanityArticle(raw);

  console.warn("[sanity] fallback to sample for: getCoverDelDia");
  return sample.getCoverDelDia();
}

export async function getFeaturedGrid(limit = 5): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getFeaturedGrid(limit);

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && esDestacada==true && esCoverDelDia!=true]
       | order(fechaPublicacion desc)[0...$limit]${CARD_PROJECTION}`,
    { limit },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn("[sanity] fallback to sample for: getFeaturedGrid");
  return sample.getFeaturedGrid(limit);
}

const WHAT_MATTERS_SLUGS: readonly string[] = [
  "crisis-hidrica-villa-mariano-moreno-cuarto-dia",
  "atletico-refuerzos-mediocampista-uruguayo-sudamericana",
  "mercedes-sosa-sinfonico-tus-teatro-san-martin",
];

export async function getDestacadasHoy(limit = 3): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getDestacadasHoy(limit);

  const slugs = WHAT_MATTERS_SLUGS.slice(0, limit);
  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && slug.current in $slugs]${CARD_PROJECTION}`,
    { slugs },
  );
  if (raws && raws.length > 0) {
    // Mantener el orden curado, no el de Sanity
    const bySlug = new Map(raws.map((r) => [r.slug, r]));
    return slugs
      .map((s) => bySlug.get(s))
      .filter((r): r is RawArticle => Boolean(r))
      .map(mapSanityArticle);
  }

  console.warn("[sanity] fallback to sample for: getDestacadasHoy");
  return sample.getDestacadasHoy(limit);
}

export async function getOpinionColumns(
  limit = 3,
): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getOpinionColumns(limit);

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && "opinion" in tags]
       | order(fechaPublicacion desc)[0...$limit]${CARD_PROJECTION}`,
    { limit },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn("[sanity] fallback to sample for: getOpinionColumns");
  return sample.getOpinionColumns(limit);
}

export async function getAllResolved(): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getAllResolved();

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article"] | order(fechaPublicacion desc)${CARD_PROJECTION}`,
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn("[sanity] fallback to sample for: getAllResolved");
  return sample.getAllResolved();
}

export async function getArticleBySlug(
  slug: string,
): Promise<ResolvedArticle | undefined> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getArticleBySlug(slug);

  const raw = await groqFetch<RawArticle>(
    `*[_type=="article" && slug.current==$slug][0]${FULL_PROJECTION}`,
    { slug },
  );
  if (raw) return mapSanityArticle(raw);

  // Sanity no devolvió nada. Sólo caemos a sample si el flag está activo Y
  // el slug existe en sample — evita comportamiento mágico para slugs
  // inventados que no existen en ningún lado.
  if (FALLBACK_TO_SAMPLE) {
    const sampleArticle = sample.getArticleBySlug(slug);
    if (sampleArticle) {
      console.warn(
        `[sanity] fallback to sample for: getArticleBySlug(${slug})`,
      );
      return sampleArticle;
    }
  }
  return undefined;
}

export async function getArticlesByCategory(
  cat: CategorySlug,
): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getArticlesByCategory(cat);

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && categoria->slug.current==$cat]
       | order(fechaPublicacion desc)${CARD_PROJECTION}`,
    { cat },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn(`[sanity] fallback to sample for: getArticlesByCategory(${cat})`);
  return sample.getArticlesByCategory(cat);
}

export async function getArticlesByAuthor(
  authorSlug: string,
): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getArticlesByAuthor(authorSlug);

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && autor->slug.current==$author]
       | order(fechaPublicacion desc)${CARD_PROJECTION}`,
    { author: authorSlug },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn(
    `[sanity] fallback to sample for: getArticlesByAuthor(${authorSlug})`,
  );
  return sample.getArticlesByAuthor(authorSlug);
}

export async function getRelatedArticles(
  article: { slug: string; categoriaSlug: CategorySlug },
  limit = 3,
): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getRelatedArticles(article, limit);

  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && categoria->slug.current==$cat && slug.current!=$slug]
       | order(fechaPublicacion desc)[0...$limit]${CARD_PROJECTION}`,
    { cat: article.categoriaSlug, slug: article.slug, limit },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn(
    `[sanity] fallback to sample for: getRelatedArticles(${article.slug})`,
  );
  return sample.getRelatedArticles(article, limit);
}

export async function getNewsLastHours(
  hours: number,
  now: Date,
): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getNewsLastHours(hours, now);

  const cutoff = new Date(now.getTime() - hours * 3_600_000).toISOString();
  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && !("opinion" in tags) && fechaPublicacion > $cutoff]
       | order(fechaPublicacion desc)${CARD_PROJECTION}`,
    { cutoff },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn("[sanity] fallback to sample for: getNewsLastHours");
  return sample.getNewsLastHours(hours, now);
}

export async function getRecentForFeed(limit = 50): Promise<ResolvedArticle[]> {
  const backend = await getBackend();
  if (backend === "sample") return sample.getRecentForFeed(limit);

  // Necesitamos `body` para `<content:encoded>` en el RSS.
  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article"] | order(fechaPublicacion desc)[0...$limit]${FULL_PROJECTION}`,
    { limit },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  console.warn("[sanity] fallback to sample for: getRecentForFeed");
  return sample.getRecentForFeed(limit);
}

export async function searchArticles(query: string): Promise<ResolvedArticle[]> {
  const q = query.trim();
  if (!q) return [];

  const backend = await getBackend();
  if (backend === "sample") return sample.searchArticles(q);

  // GROQ `match` requiere el sufijo `*` para prefix matching.
  // pt::text(body) extrae el texto plano del Portable Text para fulltext.
  // TODO: si search se vuelve lento con >500 notas, migrar a Algolia/Meilisearch.
  const term = `${q}*`;
  const raws = await groqFetch<RawArticle[]>(
    `*[_type=="article" && (
        titulo match $term ||
        copete match $term ||
        kicker match $term ||
        $term in tags ||
        pt::text(body) match $term
      )] | order(fechaPublicacion desc)${CARD_PROJECTION}`,
    { term },
  );
  if (raws && raws.length > 0) return mapMany(raws);

  // En búsqueda, "sin resultados" es un estado válido. Sólo caemos a sample
  // cuando el backend entero es sample (chequeado arriba). Acá devolvemos vacío.
  return [];
}
