import { useCallback, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

const PARSE_URL = 'http://127.0.0.1:8000/pipelines/parse';

function formatApiErrorDetail(detail) {
  if (detail == null) return '';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item?.msg ?? JSON.stringify(item)).join('\n');
  }
  return JSON.stringify(detail);
}

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

function ResultCard({ result, onClose }) {
  const isSuccess = result.type === 'success';

  return (
    <>
      <button
        type="button"
        className="workflow-result__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={`workflow-result${isSuccess ? '' : ' workflow-result--error'}`}
        role="dialog"
        aria-labelledby="workflow-result-title"
      >
        <div className="workflow-result__header">
          <h2 id="workflow-result-title" className="workflow-result__title">
            {isSuccess ? 'Pipeline parsed' : 'Could not parse pipeline'}
          </h2>
          <button
            type="button"
            className="workflow-result__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {isSuccess ? (
          <dl className="workflow-result__stats">
            <div className="workflow-result__stat">
              <dt>Nodes</dt>
              <dd>{result.num_nodes}</dd>
            </div>
            <div className="workflow-result__stat">
              <dt>Edges</dt>
              <dd>{result.num_edges}</dd>
            </div>
            <div className="workflow-result__stat">
              <dt>DAG</dt>
              <dd>
                <span
                  className={`workflow-result__badge ${
                    result.is_dag ? 'workflow-result__badge--ok' : 'workflow-result__badge--warn'
                  }`}
                >
                  {result.is_dag ? 'Valid' : 'Has cycles'}
                </span>
              </dd>
            </div>
          </dl>
        ) : (
          <p className="workflow-result__message">{result.message}</p>
        )}

        <button type="button" className="workflow-result__dismiss" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
}

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!result) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setResult(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [result]);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await fetch(PARSE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const fromBody =
          data && 'detail' in data ? formatApiErrorDetail(data.detail) : '';
        const detail =
          fromBody.trim() || `Request failed (HTTP ${response.status})`;
        setResult({ type: 'error', message: detail });
        return;
      }

      const { num_nodes, num_edges, is_dag } = data;
      setResult({ type: 'success', num_nodes, num_edges, is_dag });
    } catch (err) {
      const message =
        `Make sure the API is running at ${PARSE_URL}. ` +
        (err instanceof Error ? err.message : String(err));
      setResult({ type: 'error', message });
    }
  }, [nodes, edges]);

  return (
    <div className="workflow-submit">
      {result && <ResultCard result={result} onClose={() => setResult(null)} />}
      <button type="button" className="workflow-submit__btn" onClick={handleSubmit}>
        Submit pipeline
      </button>
    </div>
  );
};
