import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { TiempoLecturaInput } from "../components/TiempoLecturaInput";
import { slugify, slugValidation } from "./slugify";

export const article = defineType({
  name: "article",
  title: "Nota",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        'Solo minúsculas, números y guiones. Ej: "test-fase-6-cerrada".',
      options: {
        source: "titulo",
        maxLength: 96,
        slugify,
      },
      validation: slugValidation as never,
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      description: 'Pre-título corto en mayúsculas. Ej: "CASA DE GOBIERNO".',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: "copete",
      title: "Copete",
      type: "text",
      rows: 3,
      description: "Bajada del título — 1 o 2 frases que resumen la nota.",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "imagenPrincipal",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Epígrafe",
          type: "string",
          description: 'Crédito y descripción. Ej: "Foto: Prensa Casa de Gobierno".',
        }),
      ],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const v = value as { asset?: unknown } | undefined;
          if (!v) return "La imagen principal es obligatoria.";
          if (!v.asset)
            return "Tenés que subir un archivo de imagen — no alcanza con escribir el alt.";
          return true;
        }),
    }),
    defineField({
      name: "autor",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "opinión (columna)", value: "opinion" },
          { title: "urgente", value: "urgente" },
          { title: "última hora", value: "ultima-hora" },
          { title: "investigación", value: "investigacion" },
          { title: "agro-noa", value: "agro-noa" },
          { title: "legislatura", value: "legislatura" },
          { title: "atlético", value: "atletico" },
        ],
      },
      validation: (Rule) => Rule.max(8).unique(),
    }),
    defineField({
      name: "body",
      title: "Cuerpo",
      type: "array",
      description:
        'Párrafos, subtítulos H2, citas. Para columnas de opinión sumá tag "opinion".',
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Párrafo", value: "normal" },
            { title: "Subtítulo H2", value: "h2" },
            { title: "Cita destacada", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Itálica", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Enlace",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Epígrafe",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "fechaPublicacion",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    /* fechaActualizacion: NO existe como campo. El frontend la proyecta
     * desde `_updatedAt` en GROQ. */
    defineField({
      name: "esDestacada",
      title: "Destacada (FeaturedGrid del home)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "esCoverDelDia",
      title: "Cover del día",
      type: "boolean",
      initialValue: false,
      description:
        'Solo UNA nota puede tener este flag. Usá la acción "Marcar como Cover del día" en la barra de acciones — flipea el cover anterior atómicamente.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;
          // Cover del día siempre es destacada.
          const destacada = (context.document as { esDestacada?: boolean } | undefined)
            ?.esDestacada;
          if (!destacada) {
            return "Una nota Cover del día siempre debe estar destacada también.";
          }
          // Exclusividad: ningún otro doc (publicado o draft) puede tenerlo.
          const id = (context.document?._id ?? "").replace(/^drafts\./, "");
          const client = context.getClient({ apiVersion: "2024-03-15" });
          const others = await client.fetch<number>(
            `count(*[_type=="article" && esCoverDelDia==true && !(_id in [$id, "drafts." + $id])])`,
            { id },
          );
          if (others > 0) {
            return 'Ya hay otra nota marcada como Cover del día. Usá la acción "Marcar como Cover del día" para hacer el flip atómico.';
          }
          return true;
        }),
    }),
    defineField({
      name: "tiempoLectura",
      title: "Tiempo de lectura (min)",
      type: "number",
      initialValue: 4,
      description: "Auto-calculado a partir del cuerpo (200 palabras/min).",
      components: { input: TiempoLecturaInput },
      validation: (Rule) => Rule.required().integer().min(1).max(60),
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      author: "autor.nombre",
      cat: "categoria.nombre",
      date: "fechaPublicacion",
      cover: "esCoverDelDia",
      destacada: "esDestacada",
      media: "imagenPrincipal",
    },
    prepare({ title, author, cat, date, cover, destacada, media }) {
      const fecha = date
        ? new Date(date as string).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
          })
        : "";
      const flags = [cover && "🏠 cover", destacada && "★ destacada"]
        .filter(Boolean)
        .join(" · ");
      const subtitle = [cat, author, fecha, flags].filter(Boolean).join(" · ");
      return { title: title as string, subtitle, media };
    },
  },
  orderings: [
    {
      title: "Más recientes",
      name: "recienteDesc",
      by: [{ field: "fechaPublicacion", direction: "desc" }],
    },
    {
      title: "Por categoría",
      name: "porCategoria",
      by: [
        { field: "categoria.nombre", direction: "asc" },
        { field: "fechaPublicacion", direction: "desc" },
      ],
    },
    {
      title: "Por autor",
      name: "porAutor",
      by: [
        { field: "autor.nombre", direction: "asc" },
        { field: "fechaPublicacion", direction: "desc" },
      ],
    },
  ],
});
