import type { Rule, SlugRule } from "sanity";

/** kebab-case slug regex: empieza con alfanum, segmentos separados por un guion. */
export const SLUG_KEBAB_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Combining diacritics block (Unicode Combining Diacritical Marks). */
const DIACRITICS_RE = /[̀-ͯ]/g;

/** Convierte cualquier string a kebab-case lowercase ASCII.
 *
 *   "TEST - Fase 6 cerrada" -> "test-fase-6-cerrada"
 *   "Atletico juega"        -> "atletico-juega"
 *   "  Por que?  "          -> "por-que"
 *
 * Pasos:
 *   1. normalize NFD para separar acentos del caracter base.
 *   2. eliminar marcas combinantes Unicode (̀-ͯ).
 *   3. lowercase.
 *   4. cualquier secuencia de no-[a-z0-9] colapsa a un unico guion.
 *   5. trim guiones del inicio/fin.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(DIACRITICS_RE, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Validacion reusable para campos `slug` en cualquier doc.
 *
 * Bloquea el publish si:
 *   - El slug no existe.
 *   - El slug tiene mayusculas, espacios, acentos o caracteres no permitidos.
 */
export function slugValidation(rule: SlugRule): Rule | unknown {
  return rule.required().custom((slug) => {
    const current = (slug as { current?: string } | undefined)?.current;
    if (!current) return "El slug es obligatorio.";
    if (!SLUG_KEBAB_RE.test(current)) {
      return "Solo minusculas, numeros y guiones (kebab-case). Ej: test-fase-6-cerrada.";
    }
    return true;
  });
}
