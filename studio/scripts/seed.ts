/**
 * Seed: carga 8 categorías + 4 autores en Sanity.
 *
 * Requisitos:
 *   - SANITY_WRITE_TOKEN en `../.env` (raíz del repo) con role Editor.
 *   - SANITY_PROJECT_ID, SANITY_DATASET (también en `../.env`).
 *
 * Idempotente: usa `_id` deterministas (ej. `category-politica`,
 * `author-marina-chocobar`) y skipea si el doc ya existe.
 *
 * Run: `npm run seed` (desde /studio/).
 */

import { createClient } from "@sanity/client";
import { config as dotenvConfig } from "dotenv";
import { Buffer } from "node:buffer";
import { resolve } from "node:path";
import { COLOR_HEX_BY_TOKEN, type ColorToken } from "../schemas/colorMap";

// .env vive en la raíz del repo, un nivel arriba de /studio/.
dotenvConfig({ path: resolve(process.cwd(), "../.env") });

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-03-15";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID in ../.env");
}
if (!token) {
  throw new Error(
    "Missing SANITY_WRITE_TOKEN in ../.env (necesita role Editor o superior)",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/* ─────────────── Data ─────────────── */

interface SeedCategory {
  slug: ColorToken;
  nombre: string;
  descripcion: string;
  orden: number;
}

const CATEGORIES: SeedCategory[] = [
  {
    slug: "politica",
    nombre: "Política",
    descripcion:
      "Gobierno provincial, Legislatura, partidos y poder en Tucumán.",
    orden: 1,
  },
  {
    slug: "economia",
    nombre: "Economía",
    descripcion: "Dólar, inflación, comercio, empleo y finanzas del NOA.",
    orden: 2,
  },
  {
    slug: "sociedad",
    nombre: "Sociedad",
    descripcion: "Educación, salud, seguridad y vida cotidiana tucumana.",
    orden: 3,
  },
  {
    slug: "cultura",
    nombre: "Cultura",
    descripcion: "Letras, música, artes visuales, patrimonio y agenda.",
    orden: 4,
  },
  {
    slug: "deportes",
    nombre: "Deportes",
    descripcion: "Atlético, San Martín, rugby, básquet y deporte amateur.",
    orden: 5,
  },
  {
    slug: "agro",
    nombre: "Agro",
    descripcion: "Caña, limón, granos y la economía rural del norte.",
    orden: 6,
  },
  {
    slug: "espectaculos",
    nombre: "Espectáculos",
    descripcion: "Cine, televisión, escena local y entretenimiento.",
    orden: 7,
  },
  {
    slug: "mundo",
    nombre: "Mundo",
    descripcion: "Lo que importa de la actualidad internacional.",
    orden: 8,
  },
];

interface SeedAuthor {
  slug: string;
  nombre: string;
  cargo: string;
  bio: string;
  fotoUrl: string;
  redes: { twitter?: string; instagram?: string; linkedin?: string };
}

const AUTHORS: SeedAuthor[] = [
  {
    slug: "marina-chocobar",
    nombre: "Marina Chocobar",
    cargo: "Editora política",
    bio: "Cubre la Casa de Gobierno y la Legislatura desde 2014. Antes pasó por el cierre de Página/12 NOA y por la radio pública provincial.",
    fotoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&q=80",
    redes: { twitter: "marinachocobar", linkedin: "marina-chocobar" },
  },
  {
    slug: "ignacio-paz",
    nombre: "Ignacio Paz",
    cargo: "Cronista de economía",
    bio: "Escribe sobre dólar, inflación y el sector productivo del NOA. Magíster en Economía por la UNT.",
    fotoUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=600&fit=crop&q=80",
    redes: { twitter: "ignaciopaz_eco" },
  },
  {
    slug: "laura-juarez",
    nombre: "Laura Juárez",
    cargo: "Reportera de sociedad",
    bio: "Investigaciones sobre educación, salud pública y género. Premio ADEPA 2022 a la cobertura sostenida.",
    fotoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80",
    redes: { twitter: "laurajuarez", instagram: "laura.juarez" },
  },
  {
    slug: "tomas-figueroa",
    nombre: "Tomás Figueroa",
    cargo: "Cronista deportivo",
    bio: "Sigue a Atlético, San Martín y al rugby tucumano. Cubre los Juegos desde Río 2016.",
    fotoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=600&fit=crop&q=80",
    redes: { twitter: "tomasfigueroa", instagram: "tomas.figueroa" },
  },
];

/* ─────────────── Helpers ─────────────── */

async function uploadImageFromUrl(
  url: string,
  filename: string,
): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

/* ─────────────── Seeders ─────────────── */

async function seedCategories(): Promise<void> {
  console.log(`\n[categories] starting (${CATEGORIES.length} docs)...`);
  for (const cat of CATEGORIES) {
    const docId = `category-${cat.slug}`;
    const existing = await client.getDocument(docId);
    if (existing) {
      console.log(`  ✓ ${cat.slug} (already exists)`);
      continue;
    }
    await client.createOrReplace({
      _id: docId,
      _type: "category",
      nombre: cat.nombre,
      slug: { _type: "slug", current: cat.slug },
      descripcion: cat.descripcion,
      colorToken: cat.slug,
      colorHex: COLOR_HEX_BY_TOKEN[cat.slug],
      orden: cat.orden,
    });
    console.log(`  + ${cat.slug}`);
  }
}

async function seedAuthors(): Promise<void> {
  console.log(`\n[authors] starting (${AUTHORS.length} docs)...`);
  for (const a of AUTHORS) {
    const docId = `author-${a.slug}`;
    const existing = await client.getDocument(docId);
    if (existing) {
      console.log(`  ✓ ${a.slug} (already exists)`);
      continue;
    }
    console.log(`    uploading photo for ${a.slug}...`);
    const assetId = await uploadImageFromUrl(a.fotoUrl, `${a.slug}.jpg`);
    await client.createOrReplace({
      _id: docId,
      _type: "author",
      nombre: a.nombre,
      slug: { _type: "slug", current: a.slug },
      cargo: a.cargo,
      bio: a.bio,
      foto: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: `Foto de ${a.nombre}`,
      },
      redes: a.redes,
    });
    console.log(`  + ${a.slug}`);
  }
}

/* ─────────────── Main ─────────────── */

async function main(): Promise<void> {
  console.log(
    `\nSeed → projectId=${projectId} dataset=${dataset} apiVersion=${apiVersion}`,
  );
  await seedCategories();
  await seedAuthors();
  console.log("\n✓ Seed complete.\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
