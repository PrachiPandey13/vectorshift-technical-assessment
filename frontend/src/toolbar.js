import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="workflow-toolbar">
      <h1 className="workflow-toolbar__title">Pipeline builder</h1>
      <p className="workflow-toolbar__hint">Drag a node onto the canvas to add it to your workflow</p>
      <div className="workflow-toolbar__nodes">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="apiRequest" label="API Request" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="database" label="Database" />
        <DraggableNode type="notification" label="Notification" />
      </div>
    </div>
  );
};
