import { useMemo, useLayoutEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';
import { NODE_HEADER_HEIGHT, NODE_MIN_HEIGHT } from '../theme';

function uniqueVariableNames(text) {
  const re = /\{\{\s*([a-zA-Z_]\w*)\s*\}\}/g;
  const seen = new Set();
  const names = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1];
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeHeight, setNodeHeight] = useState(NODE_MIN_HEIGHT);

  const textareaRef = useRef(null);
  const contentRef = useRef(null);

  const varNames = useMemo(() => uniqueVariableNames(currText), [currText]);

  const inputs = useMemo(() => {
    const n = varNames.length;
    return varNames.map((name, i) => ({
      id: name,
      style: n > 1 ? { top: `${((i + 1) / (n + 1)) * 100}%` } : undefined,
    }));
  }, [varNames]);

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = '0px';
      ta.style.height = `${ta.scrollHeight}px`;
    }
    const content = contentRef.current;
    if (content) {
      setNodeHeight(Math.max(NODE_MIN_HEIGHT, NODE_HEADER_HEIGHT + content.offsetHeight + 20));
    }
  }, [currText, varNames]);

  return (
    <BaseNode
      title="Text"
      variant="source"
      height={nodeHeight}
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
    >
      <div ref={contentRef}>
        <label className="workflow-field">
          Text
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
};
