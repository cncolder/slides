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
}
