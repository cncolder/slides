import Debug from 'debug';

/**
 * A tiny debugging logger utility.
 *
 * @example
 *   import { debug } from './utils';
 *   const log = debug(import.meta.url);
 *   log('hello');
 *
 * @see https://github.com/debug-js/debug
 */
export function debug(metaUrl: string) {
  if (Debug.log === console.debug) {
    Debug.log = console.log;
  }

  const matched = metaUrl.match(/\/src\/([^?]+)/)?.[1];
  const instance = Debug(`app:${matched}`);

  // Force enable for development.
  if (import.meta.env.DEV) {
    instance.enabled = true;
  }

  return instance;
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  const log = debug(import.meta.url);

  it('initializes a logger function', () => {
    expect(typeof log).toBe('function');
  });
}
