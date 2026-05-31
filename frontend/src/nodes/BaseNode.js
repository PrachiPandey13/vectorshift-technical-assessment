import { Handle, Position } from 'reactflow';
import { NODE_WIDTH, NODE_MIN_HEIGHT } from '../theme';

function handlePosition(index, total, style) {
  if (style) return style;
  if (total === 1) return { top: '50%' };
  return { top: `${((index + 1) / (total + 1)) * 100}%` };
}

export function BaseNode({
  title,
  variant = 'logic',
  children,
  inputs = [],
  outputs = [],
  width = NODE_WIDTH,
  height = NODE_MIN_HEIGHT,
}) {
  return (
    <div
      className={`workflow-node workflow-node--${variant}`}
      style={{ width, height }}
    >
      {inputs.map(({ id, style }, index) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          className="workflow-handle"
          style={handlePosition(index, inputs.length, style)}
        />
      ))}
      <div className="workflow-node__header">{title}</div>
      <div className="workflow-node__body">{children}</div>
      {outputs.map(({ id, style }, index) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          className="workflow-handle"
          style={handlePosition(index, outputs.length, style)}
        />
      ))}
    </div>
  );
}
