import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">
            HNET <span className="font-light">Suporte</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;