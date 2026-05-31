export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`toolbar-node ${type}`}
      onDragStart={onDragStart}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      draggable
    >
      {label}
    </div>
  );
};
