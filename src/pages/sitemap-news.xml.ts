import type { APIRoute } from "astro";
import { getNewsLastHours } from "~/data/sample-articles";
import { SAMPLE_TODAY } from "~/lib/now";
import { SEO_CONSTANTS, absoluteUrl, escapeXml } from "~/lib/seo";

/**
 * Google News sitemap — sólo notas regulares de las últimas 48 horas.
 *
 * Mientras estamos con sample data, el "now" se ancla a SAMPLE_TODAY para que
 * el demo siempre muestre el set completo de notas. En Fase 5 (Sanity) se
 * cambia por `new Date()` y el filtro de 48 h pasa a ser real.
 */
export const GET: APIRoute = () => {
  const now = SAMPLE_TODAY;
  const articles = getNewsLastHours(48, now);

  const urlEntries = articles
    .map((a) => {
      const loc = absoluteUrl(a.url);
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SEO_CONSTANTS.SITE_NAME)}</news:name>
        <news:language>${SEO_CONSTANTS.SITE_LANG}</news:language>
      </news:publication>
      <news:publication_date>${a.fechaPublicacion}</news:publication_date>
      <news:title>${escapeXml(a.titulo)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
