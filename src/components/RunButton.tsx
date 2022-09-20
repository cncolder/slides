import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAsyncFn } from 'react-use';
import { debug } from '../utils';

const log = debug(import.meta.url);

interface RunButtonProps {
  api: string;
}

export function RunButton({ api }: RunButtonProps) {
  const modalToggleRef = useRef<HTMLInputElement>(null);

  const [{ loading, value }, run] = useAsyncFn(async () => {
    log('run %s', api);
    const res = await fetch(api);
    const text = await res.text();
    modalToggleRef.current?.click();
    return text;
  });

  const containerRef = useRef<HTMLElement>();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const id = 'run-result-container';
    containerRef.current ??=
      document.getElementById(id) ||
      document.body.appendChild(document.createElement('div'));
    containerRef.current.id = id;

    return () => {
      document.body.removeChild(document.getElementById(id)!);
    };
  }, []);

  return (
    <>
      <button className={clsx('btn btn-primary', { loading })} onClick={run}>
        Run
      </button>

      {!!containerRef.current &&
        createPortal(
          <>
            <input
              ref={modalToggleRef}
              id="run-result-modal"
              className="modal-toggle"
              type="checkbox"
            />
            <label htmlFor="run-result-modal" className="modal cursor-pointer">
              <div className="modal-box mockup-window bg-base-300">
                <pre>
                  <code>{value}</code>
                </pre>
              </div>
            </label>
          </>,
          containerRef.current
        )}
    </>
  );
}
