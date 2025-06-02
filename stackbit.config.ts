import { defineStackbitConfig, getLocalizedFieldForLocale } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      name: 'content',
      rootPath: __dirname,
      contentDirs: ['content/pages'],
      models: [
        {
          name: 'Page', // Must be capitalized
          type: 'page', // Must be lowercase
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'slug', type: 'string', required: true }, // Explicit slug field
            { name: 'pageId', type: 'string', hidden: true }, // Required for stable IDs
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
      pageLayout: 'page' // Critical for editor
    }
  ],
  onContentCreate: async ({ object }) => {
    if (!object.pageId) {
      object.pageId = Date.now().toString();
    }
    return object;
  },
  siteMap: ({ documents }) => {
    return documents.map(doc => {
      const slug = getLocalizedFieldForLocale(doc.fields?.slug);
      const pageId = getLocalizedFieldForLocale(doc.fields?.pageId);
      
      return {
        stableId: pageId?.value || doc.id,
        urlPath: `/${slug?.value || doc.slug}`,
        document: doc,
        isHomePage: doc.slug === 'home'
      };
    });
  }
});
