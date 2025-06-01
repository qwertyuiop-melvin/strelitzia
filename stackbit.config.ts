// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"], // Folder with your content (e.g., Markdown files)
      models: [
        {
          name: "Page",
          type: "page", // Makes it editable in the visual editor
          urlPath: "/{slug}", // Dynamic URL
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown" } // For rich text
          ]
        }
      ]
    })
  ]
});
