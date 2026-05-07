import type { StructureBuilder, StructureResolver } from "sanity/structure";
import {
  DocumentTextIcon,
  StarIcon,
  HomeIcon,
  CommentIcon,
  UserIcon,
  TagIcon,
} from "@sanity/icons";

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Notas")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Notas")
            .items([
              S.listItem()
                .title("Todas las notas")
                .icon(DocumentTextIcon)
                .child(
                  S.documentTypeList("article")
                    .title("Todas las notas")
                    .defaultOrdering([
                      { field: "fechaPublicacion", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Destacadas")
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title("Notas destacadas")
                    .filter('_type == "article" && esDestacada == true')
                    .defaultOrdering([
                      { field: "fechaPublicacion", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Cover del día")
                .icon(HomeIcon)
                .child(
                  S.documentList()
                    .title("Cover del día")
                    .filter('_type == "article" && esCoverDelDia == true'),
                ),
              S.listItem()
                .title("Opiniones")
                .icon(CommentIcon)
                .child(
                  S.documentList()
                    .title("Columnas de opinión")
                    .filter('_type == "article" && "opinion" in tags')
                    .defaultOrdering([
                      { field: "fechaPublicacion", direction: "desc" },
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Autores")
        .icon(UserIcon)
        .schemaType("author")
        .child(
          S.documentTypeList("author")
            .title("Autores")
            .defaultOrdering([{ field: "nombre", direction: "asc" }]),
        ),
      S.listItem()
        .title("Categorías")
        .icon(TagIcon)
        .schemaType("category")
        .child(
          S.documentTypeList("category")
            .title("Categorías")
            .defaultOrdering([{ field: "orden", direction: "asc" }]),
        ),
    ]);
