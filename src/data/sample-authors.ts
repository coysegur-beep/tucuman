import type { Author } from "~/lib/types";

export const SAMPLE_AUTHORS: Author[] = [
  {
    slug: "marina-chocobar",
    nombre: "Marina Chocobar",
    cargo: "Editora política",
    bio: "Cubre la Casa de Gobierno y la Legislatura desde 2014. Antes pasó por el cierre de Página/12 NOA y por la radio pública provincial.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&q=80",
    redes: {
      twitter: "marinachocobar",
      linkedin: "marina-chocobar",
    },
  },
  {
    slug: "ignacio-paz",
    nombre: "Ignacio Paz",
    cargo: "Cronista de economía",
    bio: "Escribe sobre dólar, inflación y el sector productivo del NOA. Magíster en Economía por la UNT.",
    foto: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=240&h=240&fit=crop&q=80",
    redes: {
      twitter: "ignaciopaz_eco",
    },
  },
  {
    slug: "laura-juarez",
    nombre: "Laura Juárez",
    cargo: "Reportera de sociedad",
    bio: "Investigaciones sobre educación, salud pública y género. Premio ADEPA 2022 a la cobertura sostenida.",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=240&fit=crop&q=80",
    redes: {
      twitter: "laurajuarez",
      instagram: "laura.juarez",
    },
  },
  {
    slug: "tomas-figueroa",
    nombre: "Tomás Figueroa",
    cargo: "Cronista deportivo",
    bio: "Sigue a Atlético, San Martín y al rugby tucumano. Cubre los Juegos desde Río 2016.",
    foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&h=240&fit=crop&q=80",
    redes: {
      twitter: "tomasfigueroa",
      instagram: "tomas.figueroa",
    },
  },
];

const AUTHORS_BY_SLUG = new Map<string, Author>(
  SAMPLE_AUTHORS.map((a) => [a.slug, a]),
);

export function getSampleAuthor(slug: string): Author {
  const a = AUTHORS_BY_SLUG.get(slug);
  if (!a) throw new Error(`Unknown author slug: ${slug}`);
  return a;
}
