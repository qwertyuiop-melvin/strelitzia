import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      name: 'content',
      rootPath: __dirname,
      contentDirs: ['content/posts'],
      models: [
        {
          name: 'page',
          type: 'page',
          urlPath: '/{slug}',
          filePath: 'content/posts/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'content', type: 'markdown' }
          ]
        }
      ]
    })
  ],
  modelExtensions: [
    { 
      name: "page", 
      type: "page", 
      urlPath: "/{slug}" 
    }
  ]
});
