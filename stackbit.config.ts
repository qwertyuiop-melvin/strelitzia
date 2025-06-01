import { defineStackbitConfig } from '@stackbit/sdk';

export default defineStackbitConfig({
  contentSources: [
    {
      name: 'content',
      type: 'git',
      connection: {
        repositoryId: 'strelitziatrio/strelitziatrio.com'
      },
      models: [
        {
          name: 'page',
          type: 'page',
          labelField: 'title',
          urlPath: '/{slug}',
          filePathPattern: 'content/posts/{slug}.md'
        }
      ]
    }
  ],
  siteMap: async ({ contentSource }) => {
    const pages = await contentSource.getAllEntries({ modelType: 'page' });
    return pages.map((page) => ({
      urlPath: `/${page.slug}`,
      entryId: page.id
    }));
  }
});
