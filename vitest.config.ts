/// <reference types="vitest" />
/// <reference types="vitest/importMeta" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
  },
});
