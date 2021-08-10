import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { dndTypes } from '@/features/Segments/constants';

const useConditionDrag = function useDragSegmentConditionHook({
  groupIndex,
  index,
}) {
  const [isDragForbidden, setIsDragForbidden] = useState(true);
  const handleDragAreaMouseover = () => setIsDragForbidden(false);
  const handleDragAreaMouseleave = () => setIsDragForbidden(true);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: dndTypes.condition,
    item: { from: [groupIndex, index] },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isDragForbidden,
  }), [dndTypes.condition, groupIndex, index, isDragForbidden]);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const defaultCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = 'grabbing';

    return () => {
      document.documentElement.style.cursor = defaultCursor;
    };
  }, [isDragging]);

  return {
    isDragging,
    dragRef,

    handleDragAreaMouseover,
    handleDragAreaMouseleave,
  };
};

export default useConditionDrag;
