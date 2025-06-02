import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      name: 'content',
      rootPath: __dirname,
      contentDirs: ['content/pages'], // MUST match your folder
      models: [
        {
          name: 'Page', // Capitalized
          type: 'page', // Lowercase
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.md',
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
      name: 'Page', 
      type: 'page', 
      urlPath: '/{slug}',
      pageLayout: 'page' // Critical for page editor
    }
  ],
  siteMap: ({ documents }) => {
    return documents.map(doc => ({
      urlPath: doc.modelName === 'Page' ? `/${doc.slug}` : '/',
      stableId: doc.id,
      document: doc,
      isHomePage: doc.slug === 'home'
    }));
  }
});
