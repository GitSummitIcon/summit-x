import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media, mediaAssetSource } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "summit-x",
  title: "Summit X",

  projectId: "w7t6epfm",
  dataset: "production",

  plugins: [deskTool(), media()],

  form: {
    image: {
      assetSources: () => [mediaAssetSource],
    },
  },

  schema: {
    types: schemaTypes,
  },
});
