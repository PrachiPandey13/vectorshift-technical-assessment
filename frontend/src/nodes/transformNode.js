import { useState } from 'react';
import { BaseNode } from './BaseNode';

const OPERATIONS = ['Map', 'Filter', 'Reduce', 'Sort', 'Flatten'];

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Map');

  return (
    <BaseNode
      title="Transform"
      variant="logic"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="workflow-field">
        Operation
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          {OPERATIONS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </label>
    </BaseNode>
  );
};
