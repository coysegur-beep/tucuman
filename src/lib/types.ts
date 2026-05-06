export type CategorySlug =
  | "politica"
  | "economia"
  | "sociedad"
  | "cultura"
  | "deportes"
  | "agro"
  | "espectaculos"
  | "mundo";

export interface Category {
  slug: CategorySlug;
  nombre: string;
  descripcion: string;
  /** Tailwind color token suffix — used as `bg-cat-${colorToken}` / `text-cat-${colorToken}`. */
  colorToken: CategorySlug;
  /** Hex color for inline styles, og images, JSON-LD, etc. */
  colorHex: string;
  orden: number;
}

export interface AuthorSocial {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Author {
  slug: string;
  nombre: string;
  cargo: string;
  bio: string;
  foto: string;
  redes?: AuthorSocial;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Article {
  slug: string;
  titulo: string;
  kicker?: string;
  copete: string;
  imagenPrincipal: ArticleImage;
  autorSlug: string;
  categoriaSlug: CategorySlug;
  tags: string[];
  fechaPublicacion: string;
  fechaActualizacion?: string;
  esDestacada: boolean;
  esCoverDelDia: boolean;
  tiempoLectura: number;
  /** Plain HTML for the sample data phase. In the Sanity phase this becomes Portable Text rendered server-side. */
  contenidoHtml?: string;
}

export interface ResolvedArticle extends Article {
  autor: Author;
  categoria: Category;
  url: string;
}
