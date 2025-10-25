import React from 'react';
import { XMarkIcon } from './Icons';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Visualização ampliada da imagem do equipamento"
    >
      <div 
        className="relative bg-white p-4 rounded-xl shadow-2xl max-w-3xl max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        <button 
            onClick={onClose}
            className="absolute -top-3 -right-3 text-brand-cool-gray-600 bg-white rounded-full p-1.5 hover:bg-brand-cool-gray-200 hover:text-brand-cool-gray-900 transition-colors z-10 shadow-lg border border-brand-cool-gray-200"
            aria-label="Fechar"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <img 
            src={imageUrl} 
            alt="Visualização ampliada do equipamento" 
            className="object-contain w-full h-full max-h-[calc(90vh-2rem)]"
        />
      </div>
    </div>
  );
};

export default ImageModal;