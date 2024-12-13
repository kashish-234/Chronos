import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

function EventModal({ date, onClose, onAddEvent }) {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ id: Date.now(), eventName, startTime, endTime, description, color });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">
            Add Event for {date.toDateString()}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-4">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-4 items-center">
            <label className="text-gray-700">Event Color:</label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded-md p-0"
            />
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <Button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-400"
            >
              Add Event
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border border-gray-300 text-gray-600 px-6 py-3 rounded-md hover:bg-gray-100"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
