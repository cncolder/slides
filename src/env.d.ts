/// <reference types="astro/client" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    'data-auto-animate'?: boolean;
    'data-id'?: string;
    'data-line-numbers'?: boolean | string;
    'data-trim'?: boolean;
  }

  interface HTMLImageAttributes {
    'data-src'?: string;
  }
}

declare module 'reveal.js/dist/reveal.esm.js' {
  export default class Reveal {
    constructor(options: any);
    initialize(options: any): void;
  }
}
declare module 'reveal.js/*' {}
