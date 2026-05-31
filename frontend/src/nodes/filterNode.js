import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      title="Filter"
      variant="logic"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true`, style: { top: `${100 / 3}%` } },
        { id: `${id}-false`, style: { top: `${200 / 3}%` } },
      ]}
    >
      <label className="workflow-field">
        Condition
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 0"
        />
      </label>
    </BaseNode>
  );
};
