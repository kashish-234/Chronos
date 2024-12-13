import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EventModal from './EventModal';
import EventList from './EventList';
import DraggableEvent from './DraggableEvent';
import { getMonthData, exportEvents } from '../utils/calendarUtils';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [exportFormat, setExportFormat] = useState('json');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const monthData = getMonthData(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => {
      const dateEvents = prevEvents[selectedDate.toDateString()] || [];
      if (isEventOverlapping(dateEvents, newEvent)) {
        alert('This event overlaps with an existing event. Please choose a different time.');
        return prevEvents;
      }
      return {
        ...prevEvents,
        [selectedDate.toDateString()]: [
          ...dateEvents,
          newEvent
        ]
      };
    });
    setShowModal(false);
  };

  const handleExport = () => {
    exportEvents(events, currentDate, exportFormat);
  };

  const isEventOverlapping = (existingEvents, newEvent) => {
    return existingEvents.some(event => {
      const newStart = new Date(`${selectedDate.toDateString()} ${newEvent.startTime}`);
      const newEnd = new Date(`${selectedDate.toDateString()} ${newEvent.endTime}`);
      const existingStart = new Date(`${selectedDate.toDateString()} ${event.startTime}`);
      const existingEnd = new Date(`${selectedDate.toDateString()} ${event.endTime}`);
      return (newStart < existingEnd && newEnd > existingStart);
    });
  };

  const moveEvent = (draggedEvent, targetDate) => {
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      const sourceDateStr = Object.keys(updatedEvents).find(date => 
        updatedEvents[date].some(event => event.id === draggedEvent.id)
      );
      
      if (sourceDateStr) {
        updatedEvents[sourceDateStr] = updatedEvents[sourceDateStr].filter(event => event.id !== draggedEvent.id);
        if (updatedEvents[sourceDateStr].length === 0) {
          delete updatedEvents[sourceDateStr];
        }
      }

      const targetDateStr = targetDate.toDateString();
      if (!updatedEvents[targetDateStr]) {
        updatedEvents[targetDateStr] = [];
      }
      updatedEvents[targetDateStr].push({ ...draggedEvent, id: Date.now() });

      return updatedEvents;
    });
  };

  const deleteEvent = (eventId) => {
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      Object.keys(updatedEvents).forEach(date => {
        updatedEvents[date] = updatedEvents[date].filter(event => event.id !== eventId);
        if (updatedEvents[date].length === 0) {
          delete updatedEvents[date];
        }
      });
      return updatedEvents;
    });
  };

  const filteredEvents = Object.entries(events).reduce((acc, [date, dateEvents]) => {
    const filtered = dateEvents.filter(event => 
      event.eventName.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      event.description.toLowerCase().includes(filterKeyword.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[date] = filtered;
    }
    return acc;
  }, {});

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar bg-blue-200">
        <div className="calendar-header">
          <Button onClick={handlePrevMonth} className="text-2xl text-white hover:bg-red-300"><ChevronLeft /></Button>
          <h2 className="text-5xl text-black">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <Button onClick={handleNextMonth} className="text-2xl text-white hover:bg-red-300"><ChevronRight /></Button>
        </div>
        <div className="calendar-controls mb-6 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Filter events..."
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            icon={<Filter />}
          />
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="text-white hover:bg-red-300">Export Events</Button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header bg-black text-white text-semibold">{day}</div>
          ))}
          {monthData.map((week, weekIndex) => (
            week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.date.getDay() === 0 || day.date.getDay() === 6 ? 'weekend' : ''}`}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
                {filteredEvents[day.date.toDateString()] && (
                  filteredEvents[day.date.toDateString()].map(event => (
                    <DraggableEvent
                      key={event.id}
                      event={event}
                      moveEvent={moveEvent}
                      targetDate={day.date}
                      deleteEvent={deleteEvent} // Pass delete function to DraggableEvent
                    />
                  ))
                )}
              </div>
            ))
          ))}
        </div>
        <Button onClick={() => setShowEventList(true)} className="view-events text-white px-6 py-2 rounded-md hover:bg-red-300">View Events</Button>
        {showModal && (
          <EventModal
            date={selectedDate}
            onClose={() => setShowModal(false)}
            onAddEvent={handleAddEvent}
          />
        )}
        {showEventList && (
          <EventList
            events={filteredEvents}
            onClose={() => setShowEventList(false)}
            deleteEvent={deleteEvent} // Pass delete function to EventList
          />
        )}
      </div>
    </DndProvider>
  );
}

export default Calendar;
