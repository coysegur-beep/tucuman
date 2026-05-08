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
| `npm run deploy` | Deploya el Studio a `eltucuman.sanity.studio`. |
| `npm run seed` | Carga 8 categorías + 4 autores. Necesita `SANITY_WRITE_TOKEN` en `../.env`. |

## Studio en producción

**URL pública**: <https://eltucuman.sanity.studio/>

Acceso desde cualquier navegador (PC, celular, tablet) sin necesidad de
clonar el repo ni levantar `npm run dev`. Login con la cuenta Sanity que
tenga rol en el proyecto `11q5xsuh`.

### Diferencia entre Studio local y Studio público

| | Local (`npm run dev`) | Público (`eltucuman.sanity.studio`) |
|---|---|---|
| URL | `localhost:3333` | `https://eltucuman.sanity.studio/` |
| Requisito | Repo clonado + Node 20+ | Solo navegador |
| Schemas | Hot reload al editar `studio/schemas/*` | Versión congelada del último `npm run deploy` |
| Caso de uso | Devs cambiando schemas, debugging, testeo de plugins | Editorial diaria, escritura desde mobile o tablet |
| Datos | Mismo dataset `production` (no aislado) | Mismo dataset `production` (no aislado) |

Importante: ambos apuntan al **mismo dataset** Sanity. Cualquier cambio
publicado en el Studio público aparece también en el local y viceversa,
porque la fuente de verdad es el dataset, no el bundle del Studio.

### Re-deploy del Studio público

Después de cambiar schemas, custom inputs o desk structure:

```bash
cd studio
npm run deploy
```

Lleva ~60-90 segundos (build + upload). El Studio público actualiza su
bundle y los editores ven el cambio en su próximo refresh.

### Invitar editores

[sanity.io/manage/personal/project/11q5xsuh/members](https://www.sanity.io/manage/personal/project/11q5xsuh/members)
→ **Invite member** → role **Editor**.

**Free tier permite hasta 3 editores activos** (incluyendo el dueño del
proyecto). Para más, hay que pasar al plan Growth ($99/mes).

> **Custom domain** (`studio.eltucuman.com`) requiere plan Growth + DNS
> setup. Por ahora usamos el subdominio gratuito `*.sanity.studio`.

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
5. **El sitio se actualiza solo en ~90 segundos** (Sanity webhook → Cloudflare
   Pages rebuild). Ver sección "Auto-deploy con webhook" abajo.

## Auto-deploy con webhook

El flow para que cada publish en el Studio dispare automáticamente un build
y deploy en `eltucuman.com`:

```
Studio Publish → Sanity webhook → Cloudflare deploy hook → CF rebuilds desde Git → eltucuman.com
       0s                ~1s                  ~2s             clone+install+build  ~90s total
```

### Configuración (referencia, ya está armado)

- **Sanity webhook**: en `sanity.io/manage → API → Webhooks`. Apunta a la URL
  del deploy hook de Cloudflare. Triggers: Create + Update + Delete sobre
  `_type in ["article","author","category"]`.
- **Cloudflare deploy hook**: creado en `Pages → eltucuman → Settings → Deploy
  hooks` (o vía API). Apunta al branch `main`. URL es secreta — quien la
  tenga puede disparar builds.
- **CF Pages config**: proyecto **Git-connected** sobre `coysegur-beep/tucuman`,
  branch `main`. Build command `npm run build`, output `dist`. Env vars
  públicas en `wrangler.toml [vars]`.

### Si el sitio no se actualiza después de Publish

1. **Sanity webhook attempts**: ir a `sanity.io/manage → API → Webhooks` →
   click el webhook → tab Attempts. Cada Publish debería aparecer ahí con
   status code 200. Si dice 500 o 404, revisar la URL del deploy hook.
2. **Cloudflare deployments**: `dash.cloudflare.com → Workers & Pages →
   eltucuman → Deployments`. Ver si llegó el build asociado al timestamp
   del Publish. Si no llegó, el webhook no disparó.
3. **Build log**: si el build aparece pero falla, abrir el deployment y leer
   el build log. Errores típicos:
   - `Build environment variables: (none found)` → falta `[vars]` en
     `wrangler.toml`.
   - Cualquier error de TypeScript/build → revisar últimos commits a `main`.

### Regenerar el deploy hook (si se filtra)

Si la URL del deploy hook se filtra (terminó en un screenshot, en logs
públicos, etc.):

1. CF Dashboard → eltucuman → Settings → Deploy hooks → **Delete** el hook
   actual.
2. Crear uno nuevo con el mismo nombre (`sanity-publish`).
3. Sanity → Webhooks → editar el webhook → reemplazar la URL → Save.

Hacerlo lo antes posible — mientras la URL vieja esté viva, cualquiera con
ella puede disparar builds (consume minutos de build de tu cuota).

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
→ El webhook debería rebuildear automáticamente en ~90s. Ver sección
"Auto-deploy con webhook" para diagnosticar. Como fallback, podés correr
`npm run build && npx wrangler pages deploy dist --project-name=eltucuman`
desde la raíz del repo.

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
