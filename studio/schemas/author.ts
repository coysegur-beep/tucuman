import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";
import { slugify, slugValidation } from "./slugify";

export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre completo",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Solo minúsculas, números y guiones (kebab-case).",
      options: { source: "nombre", maxLength: 60, slugify },
      validation: slugValidation as never,
    }),
    defineField({
      name: "cargo",
      title: "Cargo",
      type: "string",
      description: 'Ej: "Editora política", "Cronista de economía".',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Texto plano. Aparece en /autor/[slug].",
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "redes",
      title: "Redes",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "twitter",
          title: "Twitter / X (handle, sin @)",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "instagram",
          title: "Instagram (handle)",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn (handle de URL)",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "cargo", media: "foto" },
  },
  orderings: [
    { title: "Nombre A-Z", name: "nombreAsc", by: [{ field: "nombre", direction: "asc" }] },
  ],
});
