// components/Navbar.js

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-white font-bold text-lg">
          <Link href="/">
            <Image 
              src="/event.png" 
              alt="Logo"
              width={50} 
              height={50} 
            />
          </Link>
        </div>

        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/">
              <span className="hover:text-gray-300">Hem</span>
            </Link>
          </li>
          <li>
            <Link href="/event">
              <span className="hover:text-gray-300">Events</span>
            </Link>
          </li>
        </ul>

        <div>
          <UserButton
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            fallbackRedirectUrl="/"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
