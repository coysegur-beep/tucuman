import type { Article, ResolvedArticle } from "~/lib/types";
import { getCategory } from "~/lib/categories";
import { getSampleAuthor } from "./sample-authors";

/** Build an Unsplash CDN URL for the given photo id. */
function unsplash(id: string, w = 1600, h = 900): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

/**
 * Sample articles anchored around 2026-05-05 (the "today" of this dataset).
 * Replaced by Sanity GROQ queries in Phase 5 — keep the shape stable.
 */
export const SAMPLE_ARTICLES: Article[] = [
  {
    slug: "jaldo-presupuesto-2027-superavit-obra-publica",
    titulo:
      "Jaldo presentó el Presupuesto 2027 con foco en obra pública y un superávit declarado del 1,2%",
    kicker: "Casa de Gobierno",
    copete:
      "El proyecto que ingresa hoy a la Legislatura prevé $4,8 billones en gastos, paritarias atadas a inflación y la finalización de la autopista a Concepción. La oposición ya adelantó reparos por la deuda flotante.",
    imagenPrincipal: {
      url: unsplash("1517245386807-bb43f82c33c4"),
      alt: "Sesión en la Legislatura de Tucumán con el gobernador en el atril.",
      caption: "El gobernador durante la presentación. Foto: Prensa Casa de Gobierno.",
    },
    autorSlug: "marina-chocobar",
    categoriaSlug: "politica",
    tags: ["jaldo", "presupuesto", "legislatura"],
    fechaPublicacion: "2026-05-05T07:30:00-03:00",
    fechaActualizacion: "2026-05-05T10:15:00-03:00",
    esDestacada: true,
    esCoverDelDia: true,
    tiempoLectura: 7,
  },
  {
    slug: "zafra-ingenios-record-molienda-rentabilidad-cayo",
    titulo:
      "Los ingenios cerraron la zafra con récord de molienda pero la rentabilidad cayó 18%",
    kicker: "Industria azucarera",
    copete:
      "Procesaron 16,4 millones de toneladas de caña, la mejor cifra desde 2019. El precio del azúcar en góndola y el costo del gasoil agrario explican el desfasaje en los balances.",
    imagenPrincipal: {
      url: unsplash("1486406146926-c627a92ad1ab"),
      alt: "Ingenio azucarero con humo saliendo de las chimeneas al amanecer.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "economia",
    tags: ["azucar", "ingenios", "zafra", "rentabilidad"],
    fechaPublicacion: "2026-05-05T06:00:00-03:00",
    esDestacada: true,
    esCoverDelDia: false,
    tiempoLectura: 6,
  },
  {
    slug: "tucuman-cuarta-provincia-mas-abandono-escolar-secundario",
    titulo:
      "Tucumán es la cuarta provincia con más abandono escolar en el secundario, según el INDEC",
    kicker: "Educación",
    copete:
      "El informe ubica al distrito detrás de Chaco, Santiago del Estero y Salta. Los especialistas apuntan al trabajo adolescente y a la falta de cobertura de los programas de retención.",
    imagenPrincipal: {
      url: unsplash("1523580494863-6f3031224c94"),
      alt: "Aula de escuela secundaria con bancos vacíos al fondo.",
    },
    autorSlug: "laura-juarez",
    categoriaSlug: "sociedad",
    tags: ["educacion", "indec", "secundaria"],
    fechaPublicacion: "2026-05-04T22:40:00-03:00",
    esDestacada: true,
    esCoverDelDia: false,
    tiempoLectura: 5,
  },
  {
    slug: "feria-del-libro-parque-9-de-julio-2026",
    titulo:
      "Vuelve la Feria del Libro al Parque 9 de Julio: 80 stands y autores de toda Latinoamérica",
    kicker: "Agenda",
    copete:
      "Del 12 al 22 de mayo. Confirmaron Camila Sosa Villada, Mariana Enríquez y Juan Cárdenas. Habrá una carpa especial dedicada a editoriales del NOA.",
    imagenPrincipal: {
      url: unsplash("1481627834876-b7833e8f5570"),
      alt: "Stand de libros bajo carpa en una feria al aire libre.",
    },
    autorSlug: "laura-juarez",
    categoriaSlug: "cultura",
    tags: ["libros", "feria", "literatura"],
    fechaPublicacion: "2026-05-04T18:10:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "atletico-refuerzos-mediocampista-uruguayo-sudamericana",
    titulo:
      "Atlético sumó refuerzos para la Sudamericana: llegó un mediocampista uruguayo",
    kicker: "Atlético Tucumán",
    copete:
      "Se trata de Federico Viñas, ex Cerro Largo. Firmó por 18 meses con opción. Pulga Rodríguez ya entrena con el grupo y llegará al partido del sábado en Mendoza.",
    imagenPrincipal: {
      url: unsplash("1522778119026-d647f0596c20"),
      alt: "Pelota de fútbol sobre el círculo central de un estadio.",
    },
    autorSlug: "tomas-figueroa",
    categoriaSlug: "deportes",
    tags: ["atletico", "sudamericana", "fichajes"],
    fechaPublicacion: "2026-05-05T09:15:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "limon-precio-disparo-sequia-exportaciones",
    titulo:
      "El precio del limón se disparó 40% por la sequía y los productores aceleran exportaciones",
    kicker: "Agro NOA",
    copete:
      "La cosecha será 22% menor. Tucumán produce el 80% del limón argentino y la falta de lluvias en el pedemonte ya golpea las cuentas. Europa, principal destino.",
    imagenPrincipal: {
      url: unsplash("1568569350062-ebfa3cb195df"),
      alt: "Limones maduros colgando de un árbol al sol.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "agro",
    tags: ["limon", "sequia", "exportaciones"],
    fechaPublicacion: "2026-05-05T08:00:00-03:00",
    esDestacada: true,
    esCoverDelDia: false,
    tiempoLectura: 5,
  },
  {
    slug: "mercedes-sosa-sinfonico-tus-teatro-san-martin",
    titulo:
      "“Mercedes Sosa Sinfónico”: la TUS estrenó un nuevo arreglo en el Teatro San Martín",
    kicker: "Música",
    copete:
      "Tres funciones, sala llena. La Tucumán Sinfónica reinterpretó “Cuando tenga la tierra” con la voz de Soledad Pastorutti como invitada. La gira sigue por Salta y Jujuy.",
    imagenPrincipal: {
      url: unsplash("1514525253161-7a46d19cd819"),
      alt: "Orquesta sinfónica iluminada en el escenario de un teatro.",
    },
    autorSlug: "laura-juarez",
    categoriaSlug: "espectaculos",
    tags: ["mercedes-sosa", "tus", "musica"],
    fechaPublicacion: "2026-05-04T21:00:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "casa-blanca-comercio-china-agro-argentino",
    titulo:
      "La Casa Blanca volvió a apretar el comercio con China y el agro argentino sigue de cerca",
    kicker: "Internacional",
    copete:
      "Nuevos aranceles cruzados sobre soja y maíz tensan el mercado global. Para los productores del NOA puede significar una ventana corta de precios mejores en julio.",
    imagenPrincipal: {
      url: unsplash("1495020689067-958852a7765e"),
      alt: "Bandera estadounidense sobre fondo de edificios gubernamentales.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "mundo",
    tags: ["eeuu", "china", "comercio"],
    fechaPublicacion: "2026-05-05T10:30:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 6,
  },
  {
    slug: "concejo-deliberante-bloqueo-suba-tasas-2026",
    titulo:
      "Concejo Deliberante: la oposición bloqueó la suba de tasas para 2026 y forzó otra sesión",
    kicker: "San Miguel de Tucumán",
    copete:
      "Faltaron tres concejales del oficialismo y la sesión se cayó por falta de quórum. Por ahora, las tasas siguen congeladas a valores de noviembre.",
    imagenPrincipal: {
      url: unsplash("1532375810709-75b1da00537c"),
      alt: "Sala vacía del Concejo Deliberante con bancas dispuestas en U.",
    },
    autorSlug: "marina-chocobar",
    categoriaSlug: "politica",
    tags: ["concejo-deliberante", "tasas", "san-miguel"],
    fechaPublicacion: "2026-05-05T13:15:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "dolar-blue-tucuman-1350-brecha-volvio-18",
    titulo:
      "El blue tucumano cerró a $1.350 y la brecha con el oficial volvió al 18%",
    kicker: "Mercados",
    copete:
      "Tercera jornada en alza pese a las ventas del Banco Nación. Los “arbolitos” de la peatonal volvieron a quedar por encima del MEP.",
    imagenPrincipal: {
      url: unsplash("1554224155-6726b3ff858f"),
      alt: "Billetes de dólar y peso argentino sobre una mesa de cambio.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "economia",
    tags: ["dolar", "blue", "mercados"],
    fechaPublicacion: "2026-05-05T12:50:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 3,
  },
  {
    slug: "crisis-hidrica-villa-mariano-moreno-cuarto-dia",
    titulo:
      "Crisis hídrica: Villa Mariano Moreno entra en su cuarto día sin agua",
    kicker: "Sin agua",
    copete:
      "La rotura del acueducto Vipos sigue sin reparar. La SAT promete normalizar mañana al mediodía; los vecinos cortaron Avellaneda y Gobernador Garmendia.",
    imagenPrincipal: {
      url: unsplash("1505740420928-5e560c06d30e"),
      alt: "Vecinos llenando bidones en una manguera improvisada en el barrio.",
    },
    autorSlug: "laura-juarez",
    categoriaSlug: "sociedad",
    tags: ["crisis-hidrica", "sat", "vipos"],
    fechaPublicacion: "2026-05-05T13:00:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "paso-de-jama-cerrado-temporal-camioneros-varados",
    titulo:
      "El Paso de Jama cerrado por temporal: 1.200 camioneros varados del lado argentino",
    kicker: "Frontera con Chile",
    copete:
      "Nevada intensa sobre los 4.300 metros. Vialidad Nacional descarta apertura antes del miércoles. Hay carga refrigerada con limón y palta rumbo al Pacífico.",
    imagenPrincipal: {
      url: unsplash("1454486837617-ce8e1ba5ebfe"),
      alt: "Ruta de montaña con nieve y camiones detenidos al costado.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "mundo",
    tags: ["paso-jama", "chile", "exportaciones"],
    fechaPublicacion: "2026-05-05T11:00:00-03:00",
    esDestacada: true,
    esCoverDelDia: false,
    tiempoLectura: 5,
  },
  {
    slug: "encuesta-tarifas-edet-rechazo-65-tucumanos",
    titulo:
      "Encuesta: el 65% de los tucumanos rechaza el aumento de tarifas anunciado por EDET",
    kicker: "Servicios públicos",
    copete:
      "Sondeo de la consultora Análisis sobre 800 casos: 65% lo considera “muy caro” y 22% “aceptable”. La Defensoría del Pueblo anticipó que presentará un amparo.",
    imagenPrincipal: {
      url: unsplash("1497440001374-f26997328c1b"),
      alt: "Medidor eléctrico residencial con cables y caja de plástico.",
    },
    autorSlug: "marina-chocobar",
    categoriaSlug: "politica",
    tags: ["edet", "tarifas", "encuesta"],
    fechaPublicacion: "2026-05-05T12:00:00-03:00",
    esDestacada: true,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
];

/**
 * Opinion columns by the columnistas. Modeled separately because they're a
 * distinct editorial format (firma + columna recurrente), even though they
 * share the Article shape today.
 */
export const SAMPLE_OPINIONS: Article[] = [
  {
    slug: "ajuste-no-llega-tucuman-mirada-larga",
    titulo: "Por qué el ajuste no llega a Tucumán: una mirada larga",
    copete:
      "El empleo público sigue absorbiendo el 56% del presupuesto provincial. Sin tocar esa cifra, ningún superávit es real.",
    imagenPrincipal: {
      url: unsplash("1529107386315-e1a2ed48a620", 1200, 700),
      alt: "Vista aérea de la ciudad de San Miguel de Tucumán al atardecer.",
    },
    autorSlug: "marina-chocobar",
    categoriaSlug: "politica",
    tags: ["opinion", "ajuste"],
    fechaPublicacion: "2026-05-05T05:30:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 5,
  },
  {
    slug: "espejismo-del-superavit",
    titulo: "El espejismo del superávit",
    copete:
      "La caja se ordena a costa de no pagar la deuda flotante con proveedores. Es un truco viejo que ya conocemos.",
    imagenPrincipal: {
      url: unsplash("1611974789855-9c2a0a7236a3", 1200, 700),
      alt: "Pila de monedas argentinas sobre planillas de balance.",
    },
    autorSlug: "ignacio-paz",
    categoriaSlug: "economia",
    tags: ["opinion", "superavit"],
    fechaPublicacion: "2026-05-04T20:00:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
  {
    slug: "nostalgia-y-archivos",
    titulo: "Sobre la nostalgia y los archivos",
    copete:
      "Lo que se digitaliza también se decide qué se olvida. Una visita al Archivo Histórico provincial deja preguntas incómodas.",
    imagenPrincipal: {
      url: unsplash("1568667256549-094345857637", 1200, 700),
      alt: "Estanterías de archivo con carpetas y libros antiguos.",
    },
    autorSlug: "laura-juarez",
    categoriaSlug: "cultura",
    tags: ["opinion", "archivos", "memoria"],
    fechaPublicacion: "2026-05-04T19:00:00-03:00",
    esDestacada: false,
    esCoverDelDia: false,
    tiempoLectura: 4,
  },
];

const ALL = [...SAMPLE_ARTICLES, ...SAMPLE_OPINIONS];

function resolve(a: Article): ResolvedArticle {
  const autor = getSampleAuthor(a.autorSlug);
  const categoria = getCategory(a.categoriaSlug);
  return {
    ...a,
    autor,
    categoria,
    url: `/${categoria.slug}/${a.slug}`,
  };
}

function byPublishedDesc(a: Article, b: Article) {
  return b.fechaPublicacion.localeCompare(a.fechaPublicacion);
}

export function getCoverDelDia(): ResolvedArticle {
  const cover = SAMPLE_ARTICLES.find((a) => a.esCoverDelDia);
  if (!cover) throw new Error("No hay nota marcada como cover del día.");
  return resolve(cover);
}

/** Curated set anchoring "Lo que importa hoy". Picked deliberately to NOT
 * overlap with FeaturedGrid (which is the destacadas filter), so each block
 * brings a different angle to the home. Mix of sociedad/deportes/espectaculos
 * keeps the visual palette varied. */
const WHAT_MATTERS_SLUGS: readonly string[] = [
  "crisis-hidrica-villa-mariano-moreno-cuarto-dia",
  "atletico-refuerzos-mediocampista-uruguayo-sudamericana",
  "mercedes-sosa-sinfonico-tus-teatro-san-martin",
];

export function getDestacadasHoy(limit = 3): ResolvedArticle[] {
  const bySlug = new Map(SAMPLE_ARTICLES.map((a) => [a.slug, a]));
  return WHAT_MATTERS_SLUGS.slice(0, limit)
    .map((slug) => bySlug.get(slug))
    .filter((a): a is Article => a !== undefined)
    .map(resolve);
}

/** Magazine-grid hero block: all destacadas excluding the cover. */
export function getFeaturedGrid(limit = 5): ResolvedArticle[] {
  return SAMPLE_ARTICLES.filter((a) => a.esDestacada && !a.esCoverDelDia)
    .sort(byPublishedDesc)
    .slice(0, limit)
    .map(resolve);
}

export function getOpinionColumns(limit = 3): ResolvedArticle[] {
  return SAMPLE_OPINIONS.slice(0, limit).map(resolve);
}

export function getAllResolved(): ResolvedArticle[] {
  return ALL.map(resolve);
}

export function getArticleBySlug(slug: string): ResolvedArticle | undefined {
  const a = ALL.find((x) => x.slug === slug);
  return a ? resolve(a) : undefined;
}
