import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";
import { ColorHexInput } from "../components/ColorHexInput";
import { COLOR_TOKEN_OPTIONS } from "./colorMap";
import { slugify, slugValidation } from "./slugify";

export const category = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(40),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Solo minúsculas, números y guiones (kebab-case).",
      options: { source: "nombre", maxLength: 40, slugify },
      validation: slugValidation as never,
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "colorToken",
      title: "Color token",
      type: "string",
      description: "Identificador interno del color de la sección.",
      options: { list: COLOR_TOKEN_OPTIONS, layout: "radio", direction: "horizontal" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorHex",
      title: "Color hex",
      type: "string",
      readOnly: true,
      description: "Auto-generado a partir del color token.",
      components: { input: ColorHexInput },
    }),
    defineField({
      name: "orden",
      title: "Orden en NavBar",
      type: "number",
      description: "1-8. Ordena las categorías en el header del frontend.",
      validation: (Rule) => Rule.required().integer().min(1).max(8),
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "colorHex", token: "colorToken" },
    prepare({ title, subtitle, token }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} (${token})` : (token as string),
      };
    },
  },
  orderings: [
    {
      title: "Orden NavBar",
      name: "ordenAsc",
      by: [{ field: "orden", direction: "asc" }],
    },
  ],
});
