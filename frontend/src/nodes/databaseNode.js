import { useState } from 'react';
import { BaseNode } from './BaseNode';

const ACTIONS = ['Select', 'Insert', 'Update', 'Delete'];

export const DatabaseNode = ({ id, data }) => {
  const [action, setAction] = useState(data?.action || 'Select');
  const [tableName, setTableName] = useState(data?.tableName || '');

  return (
    <BaseNode
      title="Database"
      variant="integration"
      inputs={[{ id: `${id}-query` }]}
      outputs={[{ id: `${id}-result` }]}
    >
      <label className="workflow-field">
        Action
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          {ACTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>
      <label className="workflow-field">
        Table
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="table_name"
        />
      </label>
    </BaseNode>
  );
};
