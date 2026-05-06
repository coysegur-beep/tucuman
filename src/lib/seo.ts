import type { Author, Category, ResolvedArticle } from "./types";

const SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ?? "https://eltucuman.com";
const SITE_NAME = "El Tucumán";
const SITE_TAGLINE = "Periodismo regional con voz propia";
const SITE_LOCALE = "es_AR";
const SITE_LANG = "es-AR";
const TWITTER_HANDLE = "@eltucuman";

const SOCIAL_URLS = [
  "https://x.com/eltucuman",
  "https://instagram.com/eltucuman",
  "https://youtube.com/@eltucuman",
];

export const SEO_CONSTANTS = {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOCALE,
  SITE_LANG,
  TWITTER_HANDLE,
  SOCIAL_URLS,
};

/* ────────── URL helpers ────────── */

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function getCanonicalUrl(pathname: string): string {
  return absoluteUrl(pathname);
}

/** Reescribe una URL de Unsplash a 1200×630 para OG/Twitter cards. */
export function ogImageFromArticle(rawUrl: string): string {
  if (!rawUrl) return absoluteUrl("/og-default.jpg");
  if (rawUrl.includes("images.unsplash.com")) {
    return rawUrl.replace(/w=\d+/, "w=1200").replace(/h=\d+/, "h=630");
  }
  return rawUrl;
}

/* ────────── Text helpers ────────── */

/** Saca todas las etiquetas HTML y deja texto plano colapsado. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.7 ? cut.slice(0, lastSpace) : cut) + "…";
}

/** Escapa un string para insertarlo dentro de un `<script>` JSON-LD. */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/** Escapa caracteres XML inválidos en valores de texto. */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* ────────── Schema.org builders ────────── */

interface PublisherSchema {
  "@type": "NewsMediaOrganization";
  name: string;
  url: string;
  logo: { "@type": "ImageObject"; url: string; width: number; height: number };
}

const PUBLISHER: PublisherSchema = {
  "@type": "NewsMediaOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.svg"),
    width: 600,
    height: 200,
  },
};

export function buildArticleSchema(article: ResolvedArticle) {
  const url = absoluteUrl(article.url);
  const articleBody = article.contenidoHtml
    ? truncate(stripHtml(article.contenidoHtml), 500)
    : article.copete;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titulo,
    description: article.copete,
    datePublished: article.fechaPublicacion,
    dateModified: article.fechaActualizacion ?? article.fechaPublicacion,
    inLanguage: SITE_LANG,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: article.categoria.nombre,
    articleBody,
    keywords: article.tags.join(", "),
    image: [absoluteUrl(article.imagenPrincipal.url)],
    author: {
      "@type": "Person",
      name: article.autor.nombre,
      jobTitle: article.autor.cargo,
      url: absoluteUrl(`/autor/${article.autor.slug}`),
    },
    publisher: PUBLISHER,
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...PUBLISHER,
    description: SITE_TAGLINE,
    sameAs: SOCIAL_URLS,
  };
}

export function buildPersonSchema(author: Author) {
  const sameAs: string[] = [];
  if (author.redes?.twitter) sameAs.push(`https://x.com/${author.redes.twitter}`);
  if (author.redes?.instagram)
    sameAs.push(`https://instagram.com/${author.redes.instagram}`);
  if (author.redes?.linkedin)
    sameAs.push(`https://www.linkedin.com/in/${author.redes.linkedin}`);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.nombre,
    jobTitle: author.cargo,
    description: author.bio,
    image: absoluteUrl(author.foto),
    url: absoluteUrl(`/autor/${author.slug}`),
    sameAs,
    worksFor: PUBLISHER,
  };
}

/* ────────── Open Graph + Twitter ────────── */

export interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  section: string;
  tags: string[];
}

export interface OgInput {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: "website" | "article";
  article?: ArticleMeta;
}

export interface TwitterInput {
  title: string;
  description: string;
  image: string;
  creator?: string;
}

/** Tags Open Graph. Devuelve array de pares property/content. */
export function buildOgTags(input: OgInput) {
  const tags: { property: string; content: string }[] = [
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: input.url },
    { property: "og:image", content: input.image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
  ];

  if (input.type === "article" && input.article) {
    tags.push(
      { property: "article:published_time", content: input.article.publishedTime },
      { property: "article:modified_time", content: input.article.modifiedTime ?? input.article.publishedTime },
      { property: "article:author", content: input.article.author },
      { property: "article:section", content: input.article.section },
    );
    for (const tag of input.article.tags) {
      tags.push({ property: "article:tag", content: tag });
    }
  }

  return tags;
}

export function buildTwitterTags(input: TwitterInput) {
  const tags: { name: string; content: string }[] = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: input.image },
  ];
  if (input.creator) {
    tags.push({ name: "twitter:creator", content: input.creator });
  }
  return tags;
}

/* ────────── Helpers de presentación ────────── */

/** Convierte una fecha ISO a RFC 822 para RSS. */
export function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

/** Devuelve la fecha en ISO sin milisegundos. */
export function toIsoSeconds(iso: string): string {
  return new Date(iso).toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function describeCategoryForOg(category: Category): string {
  return `Sección ${category.nombre} en El Tucumán: ${category.descripcion}`;
}
