import { toHTML, type PortableTextHtmlComponents } from "@portabletext/to-html";

/* Serializador Portable Text → HTML.
 *
 * Mantiene el shape de markup que ya estiliza global.css en `.article-body`:
 *   - `normal`     → <p>
 *   - `h2`         → <h2>
 *   - `blockquote` → <blockquote><p>...</p></blockquote>  (el <p> interno
 *     es necesario para que `.article-body blockquote p { margin-bottom: 0 }`
 *     anule el margen del párrafo dentro de la cita).
 *
 * Las marcas (link, em, strong) y listas usan los defaults de
 * @portabletext/to-html, que ya producen <a>, <em>, <strong>, <ul>, <ol>. */

const components: Partial<PortableTextHtmlComponents> = {
  block: {
    blockquote: ({ children }) => `<blockquote><p>${children}</p></blockquote>`,
  },
};

export function portableTextToHtml(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  try {
    return toHTML(blocks, { components });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[portable-text] serialization failed: ${msg}`);
    return "";
  }
}
