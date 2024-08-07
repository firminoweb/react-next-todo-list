'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center">
          <Link href="/" className="text-gray-800 font-semibold text-xl">
            ToDo List
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link href="/create" className="menu-button">
            Criar novo To-Do
          </Link>
          <Link href="/about" className="menu-button">
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
