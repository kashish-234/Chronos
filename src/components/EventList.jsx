import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

function EventList({ events, onClose, deleteEvent }) {
  const sortedDates = Object.keys(events).sort((a, b) => new Date(a) - new Date(b));

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId); // Delete event by calling deleteEvent function passed as prop
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Events</DialogTitle>
        </DialogHeader>
        <div className="event-list-content">
          {sortedDates.map(date => (
            <div key={date}>
              <h3>{date}</h3>
              <ul>
                {events[date].map((event, index) => (
                  <li key={index} style={{ borderLeft: `5px solid ${event.color}` }}>
                    <strong>{event.eventName}</strong>
                    <p>{event.startTime} - {event.endTime}</p>
                    <p>{event.description}</p>
                    <Button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-500 text-white text-xs mt-2"
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventList;
