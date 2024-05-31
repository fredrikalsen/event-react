'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const EventDetailPage = () => {
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const { user } = useUser(); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState({ book: false, unbook: false });
  const [isBooked, setIsBooked] = useState(false); 

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/event/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await response.json();
        setEvent(eventData);

        if (user) {
          const email = user.primaryEmailAddress?.emailAddress;
          setIsBooked(eventData.attendees.includes(email));
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId, user]);

  const handleBook = async () => {
    if (!user) {
      setMessage('You must be logged in to book the event.');
      return;
    }
  
    setLoading({ ...loading, book: true });
    const email = user.primaryEmailAddress?.emailAddress;
  
    try {
      const response = await fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          eventId: eventId,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setMessage('Booking successful!');
        setIsBooked(true); 
      } else {
        setMessage(result.message || 'Error booking event');
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setMessage('Error booking event');
    } finally {
      setLoading({ ...loading, book: false });
    }
  };

  const handleUnbook = async () => {
    if (!user) {
      setMessage('You must be logged in to unbook the event.');
      return;
    }

    setLoading({ ...loading, unbook: true });
    const email = user.primaryEmailAddress?.emailAddress;

    try {
      const response = await fetch('http://localhost:3000/api/avbookning', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          eventId: eventId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Unbooking successful!');
        setIsBooked(false); 
      } else {
        setMessage(result.message || 'Error unbooking event');
      }
    } catch (error) {
      console.error('Error unbooking event:', error);
      setMessage('Error unbooking event');
    } finally {
      setLoading({ ...loading, unbook: false });
    }
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-4 border rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <img src={event.imageUrl} alt={event.imageName} className="w-full h-auto rounded mb-4" />
        <p className="text-lg mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="text-lg mb-2"><strong>Time:</strong> {event.time}</p>
        <p className="text-lg mb-2"><strong>Location:</strong> {event.city}</p>
        <p className="text-lg mb-2"><strong>Seats:</strong> {event.seats}</p>
        <p className="text-lg"><strong>Description:</strong> {event.description}</p>
        <div className="mt-4 flex space-x-4">
          {event.seats > 0 && !isBooked && (
            <button
              onClick={handleBook}
              className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ${loading.book ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading.book}
            >
              {loading.book ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Boka'
              )}
            </button>
          )}
          {event.seats === 0 && !isBooked && (
            <p className="text-red-500 text-lg">This event is fully booked.</p>
          )}
          {isBooked && (
            <button
              onClick={handleUnbook}
              className={`p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 ${loading.unbook ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading.unbook}
            >
              {loading.unbook ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Avboka'
              )}
            </button>
          )}
        </div>
        {message && (
          <p className="mt-4 text-center text-lg text-green-500">{message}</p>
        )}
      </div>
    </>
  );
};

export default EventDetailPage;
