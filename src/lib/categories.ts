import type { Category, CategorySlug } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "politica",
    nombre: "Política",
    descripcion: "Gobierno provincial, Legislatura, partidos y poder en Tucumán.",
    colorToken: "politica",
    colorHex: "#A32D2D",
    orden: 1,
  },
  {
    slug: "economia",
    nombre: "Economía",
    descripcion: "Dólar, inflación, comercio, empleo y finanzas del NOA.",
    colorToken: "economia",
    colorHex: "#185FA5",
    orden: 2,
  },
  {
    slug: "sociedad",
    nombre: "Sociedad",
    descripcion: "Educación, salud, seguridad y vida cotidiana tucumana.",
    colorToken: "sociedad",
    colorHex: "#3B6D11",
    orden: 3,
  },
  {
    slug: "cultura",
    nombre: "Cultura",
    descripcion: "Letras, música, artes visuales, patrimonio y agenda.",
    colorToken: "cultura",
    colorHex: "#3C3489",
    orden: 4,
  },
  {
    slug: "deportes",
    nombre: "Deportes",
    descripcion: "Atlético, San Martín, rugby, básquet y deporte amateur.",
    colorToken: "deportes",
    colorHex: "#0F6E56",
    orden: 5,
  },
  {
    slug: "agro",
    nombre: "Agro",
    descripcion: "Caña, limón, granos y la economía rural del norte.",
    colorToken: "agro",
    colorHex: "#854F0B",
    orden: 6,
  },
  {
    slug: "espectaculos",
    nombre: "Espectáculos",
    descripcion: "Cine, televisión, escena local y entretenimiento.",
    colorToken: "espectaculos",
    colorHex: "#993556",
    orden: 7,
  },
  {
    slug: "mundo",
    nombre: "Mundo",
    descripcion: "Lo que importa de la actualidad internacional.",
    colorToken: "mundo",
    colorHex: "#444441",
    orden: 8,
  },
];

const CATEGORY_BY_SLUG = new Map<CategorySlug, Category>(
  CATEGORIES.map((c) => [c.slug, c]),
);

export function getCategory(slug: CategorySlug): Category {
  const c = CATEGORY_BY_SLUG.get(slug);
  if (!c) throw new Error(`Unknown category slug: ${slug}`);
  return c;
}
