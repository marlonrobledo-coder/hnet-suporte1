import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-brand-cool-gray-200/80">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-brand-cool-gray-800">
            <span className="text-brand-primary-600">HNET</span> <span className="font-light text-brand-cool-gray-600">Suporte Técnico</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;