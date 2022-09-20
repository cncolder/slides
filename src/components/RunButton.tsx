import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { debug } from '../utils';

const log = debug(import.meta.url);

interface RunButtonProps {
  api: string;
}

export function RunButton({ api }: RunButtonProps) {
  const modalToggleRef = useRef<HTMLInputElement>(null);
  const modalId = useMemo(() => `run-result-modal-${Date.now()}`, []);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const run = useCallback(async () => {
    try {
      setLoading(true);
      log('run %s', api);
      const res = await fetch(api);
      const text = await res.text();
      setResult(text);
      modalToggleRef.current?.click();
    } finally {
      setLoading(false);
    }
  }, [api]);

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
              id={modalId}
              className="modal-toggle"
              type="checkbox"
            />
            <label htmlFor={modalId} className="modal cursor-pointer">
              <div className="modal-box mockup-window p-0 py-5 bg-base-300">
                <pre className="px-6">
                  <code>{result}</code>
                </pre>
              </div>
            </label>
          </>,
          containerRef.current
        )}
    </>
  );
}
