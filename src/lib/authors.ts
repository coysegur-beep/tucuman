import type { Author, AuthorSocial } from "./types";
import { getBackend, groqFetch } from "./sanity";
import { SAMPLE_AUTHORS, getSampleAuthor } from "~/data/sample-authors";

const AUTHOR_PROJECTION = `{
  "slug": slug.current,
  nombre,
  cargo,
  bio,
  "foto": foto.asset->url,
  redes
}`;

interface RawAuthor {
  slug: string;
  nombre: string;
  cargo: string;
  bio: string;
  foto: string;
  redes?: AuthorSocial;
}

function mapAuthor(raw: RawAuthor): Author {
  return {
    slug: raw.slug,
    nombre: raw.nombre,
    cargo: raw.cargo,
    bio: raw.bio,
    foto: raw.foto,
    redes: raw.redes,
  };
}

/** Lista completa de autores. Usa Sanity si hay backend, sample en caso contrario. */
export async function getAllAuthors(): Promise<Author[]> {
  const backend = await getBackend();
  if (backend === "sample") return SAMPLE_AUTHORS;

  const raws = await groqFetch<RawAuthor[]>(
    `*[_type=="author"] | order(nombre asc)${AUTHOR_PROJECTION}`,
  );
  if (raws && raws.length > 0) return raws.map(mapAuthor);

  console.warn("[sanity] fallback to sample for: getAllAuthors");
  return SAMPLE_AUTHORS;
}

/** Autor por slug. Levanta si no existe (mismo contrato que getSampleAuthor). */
export async function getAuthorBySlug(slug: string): Promise<Author> {
  const backend = await getBackend();
  if (backend === "sample") return getSampleAuthor(slug);

  const raw = await groqFetch<RawAuthor>(
    `*[_type=="author" && slug.current==$slug][0]${AUTHOR_PROJECTION}`,
    { slug },
  );
  if (raw) return mapAuthor(raw);

  console.warn(`[sanity] fallback to sample for: getAuthorBySlug(${slug})`);
  return getSampleAuthor(slug);
}
