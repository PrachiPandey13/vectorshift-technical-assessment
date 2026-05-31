import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      variant="logic"
      inputs={[
        { id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <p className="workflow-node__hint">This is a LLM.</p>
    </BaseNode>
  );
};
