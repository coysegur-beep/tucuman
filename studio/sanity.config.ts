import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./structure/deskStructure";
import { setAsCoverAction } from "./actions/setAsCoverAction";

export default defineConfig({
  name: "el-tucuman",
  title: "El Tucumán — Studio",
  projectId: "11q5xsuh",
  dataset: "production",
  basePath: "/studio",

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: "2024-03-15" }),
  ],

  schema: { types: schemaTypes },

  document: {
    /** Sumamos `setAsCoverAction` sólo a documentos `article`. El resto
     * mantiene las acciones default (publish, discard changes, etc). */
    actions: (prev, context) => {
      if (context.schemaType === "article") {
        return [...prev, setAsCoverAction];
      }
      return prev;
    },
  },
});
