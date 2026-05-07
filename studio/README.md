# El Tucumán — Sanity Studio

Studio de admin de El Tucumán. Vive separado del frontend Astro y se publica
en su propia URL. Todo el contenido editorial (notas, autores, categorías) se
edita acá y el frontend lo lee vía GROQ con los facades de
`src/lib/articles.ts` y `src/lib/authors.ts`.

## Quickstart

```bash
cd studio
npm install
npm run dev
```

→ http://localhost:3333

Necesitás una cuenta Sanity con acceso al proyecto `11q5xsuh`. Si es la
primera vez, corré `npx sanity login` antes.

## Comandos

| comando | qué hace |
|---|---|
| `npm run dev` | Studio local en `localhost:3333` con hot reload de schemas. |
| `npm run build` | Bundle estático en `dist/`. |
| `npm run deploy` | Deploya el Studio a `studio-tucuman.sanity.studio`. |
| `npm run seed` | Carga 8 categorías + 4 autores. Necesita `SANITY_WRITE_TOKEN` en `../.env`. |

## Deploy

```bash
npm run deploy
```

URL pública: `studio-tucuman.sanity.studio`. La primera vez Sanity te pide
elegir el hostname; está cableado a `studio-tucuman` en `sanity.cli.ts`.

> **Custom domain** (`studio.eltucuman.com`) requiere plan Growth ($99/mes).
> Por ahora usamos el subdominio gratuito `*.sanity.studio`.

## Crear una nota nueva

1. Login en el Studio.
2. Sidebar → **Notas** → **Todas las notas** → botón **Create**.
3. Llenar campos en orden:
   - **Título**: 10–120 caracteres. Genera el slug automáticamente.
   - **Slug**: editable si querés override. Tiene que ser único.
   - **Kicker** (opcional): pre-título corto en mayúsculas. Ej:
     `CASA DE GOBIERNO`.
   - **Copete**: bajada de 1–2 frases, máx 280 caracteres.
   - **Imagen principal**: subir o arrastrar. **Alt obligatorio**.
     Caption opcional para el crédito y descripción.
   - **Autor**: elegir de la lista (referencia).
   - **Categoría**: elegir de la lista (referencia).
   - **Tags**: hasta 8. Si incluís `opinion`, la nota se renderiza como
     columna de opinión (sin drop cap, título en itálica).
   - **Body**: párrafos normales, H2 para subtítulos y blockquote para citas
     destacadas. También admite imágenes inline y links.
   - **Fecha de publicación**: por defecto `now`. Cambiala si querés
     antedatar o postdatar.
   - **Destacada**: si la marcás, la nota entra al FeaturedGrid del home.
   - **Cover del día**: **NO uses el checkbox**. Usá la acción
     **"Marcar como Cover del día"** en la barra de acciones (botón con ícono
     ⭐ a la derecha de Publish). Esa acción flipea el cover anterior
     atómicamente y setea `esDestacada=true`.
   - **Tiempo de lectura**: se autocalcula del body (200 pal/min, mínimo 2).
     No editar.
4. **Publish** (botón abajo a la derecha).
5. El sitio se actualiza al próximo build del frontend
   (`npm run build` desde la raíz del repo). En esta fase no hay rebuild
   automático con webhook.

## Imágenes

- **Recomendado**: subir al asset store de Sanity (drag & drop en el campo
  imagen). El frontend usa `urlFor()` con presets para servir cada tamaño:
  - `hero` 1280×720 (detalle)
  - `og` 1200×630 (Open Graph)
  - `thumb` 400×225 (cards)
  - `avatar` 240×240 / `avatar-sm` 160×160 (autores)
- URLs externas (Unsplash, etc.) sólo en assets seed o casos especiales.

## Invitar editores

[sanity.io/manage](https://sanity.io/manage) → proyecto **El Tucumán** →
**Members** → **Invite**.

Roles típicos:
- **Editor**: puede crear/publicar notas, no toca schemas ni billing.
- **Administrator**: full access. Reservado para devs.

## Troubleshooting

**El Studio no levanta — `ECONNREFUSED` o `Not authenticated`**
→ Tu cuenta no está logueada. Corré `npx sanity login` y volvé a
`npm run dev`.

**El frontend no encuentra notas nuevas**
→ El build de Astro no se reactiva automático. Después de publicar en
Sanity, rebuildeá el frontend (`npm run build` en la raíz).

**Validación: "Ya hay otra nota marcada como cover del día"**
→ Existe otra nota con `esCoverDelDia=true`. Usá la acción
**Marcar como Cover del día** que flipea el anterior atómicamente.

**Seed falla con 401 o 403**
→ El `SANITY_WRITE_TOKEN` no tiene permisos de escritura. Generá uno nuevo
con role **Editor** en
[sanity.io/manage](https://sanity.io/manage) → API → Tokens.

**Seed sube las fotos pero después tira "image upload rate limit"**
→ Sanity rate-limita uploads. Esperá 60 segundos y volvé a correr `npm run
seed`. Es idempotente: skipea autores ya creados.

**El custom input de tiempoLectura no se actualiza**
→ Refrescá el browser. Sanity v3 cachea componentes custom en HMR a veces.

## Features futuros (no implementados)

- **Scheduled Publishing**: programar publicaciones a fecha futura. Se puede
  agregar con el plugin community `sanity-plugin-scheduled-publishing` o con
  el feature paga del Growth plan. Lo dejamos para cuando crezca el equipo.
- **Webhook → Cloudflare Pages**: rebuild automático del frontend al
  publicar en Sanity. Necesita configurar un webhook en
  sanity.io/manage → API → Webhooks apuntando al deploy hook de Cloudflare.
- **Internacionalización**: por ahora solo `es-AR`.
- **Custom domain del Studio**: requiere plan pago.
