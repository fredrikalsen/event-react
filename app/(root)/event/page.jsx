'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import { useUser } from '@clerk/nextjs';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortCriteria, setSortCriteria] = useState({ field: 'date', order: 'asc' });
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/event'); 
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();
        const upcomingEvents = eventsData.filter(event => new Date(event.date) >= new Date());
        setEvents(upcomingEvents);
        setSortedEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (isSignedIn) {
      fetchEvents();
    }
  }, [isSignedIn]);

  useEffect(() => {
    const sortArray = (array) => {
      return array.sort((a, b) => {
        if (sortCriteria.field === 'date') {
          return sortCriteria.order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }
        if (sortCriteria.field === 'city') {
          return sortCriteria.order === 'asc' ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city);
        }
        return 0;
      });
    };
    setSortedEvents(sortArray([...events]));
  }, [sortCriteria, events]);

  const toggleExpand = (event) => {
    const updatedEvents = sortedEvents.map((evt) =>
      evt.id === event.id ? { ...evt, expanded: !evt.expanded } : evt
    );
    setSortedEvents(updatedEvents);
  };

  const handleDetailClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Evenemang</h1>
        <div className="flex justify-between mb-4">
          <div>
            <label className="mr-2">Sort by:</label>
            <select
              value={sortCriteria.field}
              onChange={(e) => setSortCriteria({ ...sortCriteria, field: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="date">Date</option>
              <option value="city">City</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Order:</label>
            <select
              value={sortCriteria.order}
              onChange={(e) => setSortCriteria({ ...sortCriteria, order: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.city}</p>
                <p className="text-gray-600 mb-2">{event.date} | {event.time}</p>
                {event.expanded ? (
                  <p className="text-gray-700 mb-4">{event.description}</p>
                ) : (
                  <p className="text-gray-700 mb-4">{event.description.slice(0, 150)}...</p>
                )}
                {event.description.length > 150 && (
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={() => toggleExpand(event)}
                  >
                    {event.expanded ? 'Visa mindre' : 'Visa mer'}
                  </button>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{event.seats} platser</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
                    onClick={() => handleDetailClick(event.id)}
                  >
                    Visa detaljer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
