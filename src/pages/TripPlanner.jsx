import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../Components/Navbar/Navbar';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TripPlanner = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    start: new Date(),
    end: new Date(),
    description: ""
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, {
      ...newEvent,
      id: Date.now()
    }]);
    setShowModal(false);
    setNewEvent({
      title: "",
      type: "",
      start: new Date(),
      end: new Date(),
      description: ""
    });
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#009688';
    switch (event.type) {
      case 'Sightseeing':
        backgroundColor = '#2196F3';
        break;
      case 'Entertainment':
        backgroundColor = '#FF5722';
        break;
      case 'Relaxation':
        backgroundColor = '#4CAF50';
        break;
      case 'Adventure':
        backgroundColor = '#FFC107';
        break;
      default:
        backgroundColor = '#009688';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-800">Trip Planner</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add Event
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            popup
            selectable
            onSelectSlot={(slotInfo) => {
              setNewEvent(prev => ({
                ...prev,
                start: slotInfo.start,
                end: slotInfo.end
              }));
              setShowModal(true);
            }}
          />
        </div>

        {/* Add Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Add Event</h2>
              <form onSubmit={handleAddEvent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Title</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    >
                      <option value="">Select Type</option>
                      <option value="Sightseeing">Sightseeing</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Relaxation">Relaxation</option>
                      <option value="Adventure">Adventure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="datetime-local"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="datetime-local"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
