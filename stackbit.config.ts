import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      name: 'content',
      rootPath: __dirname,
      contentDirs: ['content/pages'], // MUST use this exact path
      models: [
        {
          name: 'Page', // MUST be capitalized
          type: 'page', // MUST be lowercase
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.md', // MUST use .md
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              required: true,
              constrolType: 'text-input' // REQUIRED for editing
            },
            { 
              name: 'content', 
              type: 'markdown',
              constrolType: 'markdown' // REQUIRED for editing
            }
          ]
        }
      ]
    })
  ],
  modelExtensions: [
    { 
      name: 'Page', 
      type: 'page', 
      urlPath: '/{slug}' 
    }
  ]
});
