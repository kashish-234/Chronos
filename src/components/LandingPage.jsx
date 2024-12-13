import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, MoveHorizontalIcon as DragHorizontal, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LandingPage() {
  return (
    <div className="landing-page bg-blue-200 min-h-screen flex flex-col">
      <div className='border-4 border-black mx-auto'>
        {/* Header */}
      <header className="bg-gray-700 shadow-md py-4 text-white mx-0">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-5xl font-bold text-white">Chronos</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:text-red-300 font-medium">
              Home
            </Link>
            <Link to="/calendar" className="text-white hover:text-red-300 font-medium">
              Calendar
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6">
        <section>
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Event Planning Made Easy
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Organize your schedule, manage events, and boost your productivity with our intuitive calendar application.
          </p>
          <Button asChild className="bg-gray-700 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-300">
            <Link to="/calendar">Get Started</Link>
          </Button>
        </section>

        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="feature bg-white rounded-lg shadow-md p-6 text-center">
            <div className="icon text-red-300 mb-4">
              <Calendar size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Dynamic Calendar View</h3>
            <p className="text-gray-600 mt-2">
              Easily navigate through months and manage your events with our interactive calendar.
            </p>
          </div>
          <div className="feature bg-white rounded-lg shadow-md p-6 text-center">
            <div className="icon text-red-300 mb-4">
              <Clock size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Efficient Event Management</h3>
            <p className="text-gray-600 mt-2">
              Add, edit, and delete events with ease. Set start and end times for precise scheduling.
            </p>
          </div>
          <div className="feature bg-white rounded-lg shadow-md p-6 text-center">
            <div className="icon text-red-300 mb-4">
              <Tag size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Color Coding</h3>
            <p className="text-gray-600 mt-2">
              Categorize your events with color codes for better organization and quick visual reference.
            </p>
          </div>
          <div className="feature bg-white rounded-lg shadow-md p-6 text-center">
            <div className="icon text-red-300 mb-4">
              <DragHorizontal size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Drag and Drop</h3>
            <p className="text-gray-600 mt-2">
              Easily reschedule events by dragging and dropping them between days.
            </p>
          </div>
          <div className="feature bg-white rounded-lg shadow-md p-6 text-center">
            <div className="icon text-red-300 mb-4">
              <FileJson size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Export Events</h3>
            <p className="text-gray-600 mt-2">
              Export your events for a specific month as a JSON or CSV file for backup or analysis.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-4 mt-8 mx-0">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Chronos. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </div> 
  );
}

export default LandingPage;
