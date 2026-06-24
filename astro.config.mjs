// @ts-check
import { defineConfig } from 'astro/config';

// Honey Badgers — static marketing site.
// Near-zero JS by default; add framework islands (e.g. React for Shopify
// headless commerce) only where interactivity demands it.
export default defineConfig({
  site: 'https://honeybadgers.co',
});
