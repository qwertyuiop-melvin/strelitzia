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
          name: 'page',
          type: 'page', // This is crucial for visual editing
          labelField: 'title',
          urlPath: '/{slug}',
          filePath: 'content/posts/{slug}.md', // Changed from filePathPattern to filePath
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'content', type: 'markdown' } // Add your content field
          ]
        }
      ],
    })
  ],
  siteMap: ({ documents }) => {
    return documents
      .filter(document => document.modelName === 'page')
      .map(document => ({
        urlPath: `/${document.slug}`,
        stableId: document.id,
        document,
        isHomePage: document.slug === 'home'
      }));
  }
});
