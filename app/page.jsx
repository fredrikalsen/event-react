'use client'

import { UserButton, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/navbar'; 

const HomePage = () => {
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="flex items-center justify-center h-screen pb-56">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Evenemangsidan</h1>
          <p className="text-lg mb-3">Välkommen!</p>
          <Link href="/event">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Utforska våra event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;