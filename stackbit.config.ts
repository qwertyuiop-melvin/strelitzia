import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      name: 'content',
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'homepage', // Changed from 'page' to match our specific homepage
          type: 'page',
          urlPath: '/',
          filePath: 'content/home.md', // Specific file for homepage
          fields: [
            { 
              name: 'metadata',
              type: 'object',
              fields: [
                { name: 'title', type: 'string', required: true }
              ]
            },
            { 
              name: 'hero',
              type: 'object',
              fields: [
                { name: 'title', type: 'string', required: true },
                { name: 'description', type: 'string' }
              ]
            }
          ]
        }
      ]
    })
  ],
  siteMap: ({ documents }) => {
    return documents.map(document => ({
      urlPath: document.modelName === 'homepage' ? '/' : `/${document.slug}`,
      stableId: document.id,
      document,
      isHomePage: document.modelName === 'homepage'
    }));
  }
});
