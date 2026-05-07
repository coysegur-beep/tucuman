import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "11q5xsuh",
    dataset: "production",
  },
  /** sanity deploy elige la URL `studio-tucuman.sanity.studio` la primera vez. */
  studioHost: "studio-tucuman",
});
