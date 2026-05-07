import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "11q5xsuh",
    dataset: "production",
  },
  /** Hostname público del Studio. URL final: https://eltucuman.sanity.studio
   * Si "eltucuman" ya está tomado por otro proyecto a nivel global, sanity deploy
   * pide elegir otro hostname interactivamente. */
  studioHost: "eltucuman",
});
