import type { APIRoute } from "astro";
import { getRecentForFeed } from "~/data/sample-articles";
import { SAMPLE_TODAY } from "~/lib/now";
import {
  SEO_CONSTANTS,
  absoluteUrl,
  escapeXml,
  stripHtml,
  toRfc822,
  truncate,
} from "~/lib/seo";

/**
 * RSS 2.0 — últimas 50 notas + columnas, ordenadas por fechaPublicacion desc.
 * Incluye Dublin Core (`dc:creator`) y Content (`content:encoded`) namespaces
 * para mejor compatibilidad con readers modernos. `lastBuildDate` se ancla a
 * SAMPLE_TODAY mientras usamos sample data.
 */
export const GET: APIRoute = () => {
  const articles = getRecentForFeed(50);
  const lastBuild = toRfc822(SAMPLE_TODAY.toISOString());
  const feedUrl = absoluteUrl("/feed.xml");

  const items = articles
    .map((a) => {
      const link = absoluteUrl(a.url);
      const description = a.copete;
      const fullHtml = a.contenidoHtml ?? `<p>${escapeXml(a.copete)}</p>`;
      const summary = truncate(stripHtml(fullHtml), 800);
      return `    <item>
      <title>${escapeXml(a.titulo)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(a.fechaPublicacion)}</pubDate>
      <dc:creator>${escapeXml(a.autor.nombre)}</dc:creator>
      <category>${escapeXml(a.categoria.nombre)}</category>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${summary}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SEO_CONSTANTS.SITE_NAME)}</title>
    <link>${SEO_CONSTANTS.SITE_URL}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SEO_CONSTANTS.SITE_TAGLINE)} — Diario digital de Tucumán, Argentina.</description>
    <language>${SEO_CONSTANTS.SITE_LANG}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SEO_CONSTANTS.SITE_NAME)}</copyright>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
};
