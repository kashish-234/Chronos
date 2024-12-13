import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableEvent({ event, moveEvent, targetDate, deleteEvent }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: { ...event },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveEvent(item, targetDate);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="draggable-event p-2 rounded-md text-white relative"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: event.color,
        cursor: 'move',
      }}
    >
      <div className="flex justify-between items-center">
        <span>{event.eventName}</span>
      </div>
      <p>{event.startTime} - {event.endTime}</p>
      <p>{event.description}</p>
    </div>
  );
}

export default DraggableEvent;
