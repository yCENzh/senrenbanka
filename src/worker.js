export { SaveManager } from './save-manager.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API requests → forward to Durable Object
    if (url.pathname.startsWith('/api/')) {
      const id = env.SAVE_MANAGER.idFromName('global');
      const stub = env.SAVE_MANAGER.get(id);
      return stub.fetch(request);
    }

    // Non-API requests → serve static assets (handled by [assets] binding)
    // If no asset matched, this returns a 404 by default
    return new Response('Not found', { status: 404 });
  },
};
