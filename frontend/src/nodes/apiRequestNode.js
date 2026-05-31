import { useState } from 'react';
import { BaseNode } from './BaseNode';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const ApiRequestNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');

  return (
    <BaseNode
      title="API Request"
      variant="integration"
      inputs={[{ id: `${id}-trigger` }]}
      outputs={[{ id: `${id}-response` }]}
    >
      <label className="workflow-field">
        Method
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <label className="workflow-field">
        URL
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
    </BaseNode>
  );
};
