import React, { useState, useCallback, useMemo } from 'react';
import { Equipment, FlowchartNode as FlowchartNodeType } from './types';
import { FLOWCHART_DATA, INITIAL_EQUIPMENT } from './constants';
import Header from './components/Header';
import FlowchartNode from './components/FlowchartNode';
import EquipmentPanel from './components/EquipmentPanel';
import ImageModal from './components/ImageModal';

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [equipment, setEquipment] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [customEquipmentImages, setCustomEquipmentImages] = useState<{ [modelName: string]: string }>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const currentNode: FlowchartNodeType = useMemo(() => FLOWCHART_DATA[currentNodeId], [currentNodeId]);

  const handleReset = useCallback(() => {
    setCurrentNodeId('start');
  }, []);

  const handleNavigation = useCallback((nodeId: string) => {
    if (FLOWCHART_DATA[nodeId]) {
      setCurrentNodeId(nodeId);
    } else {
      console.error('Etapa do fluxograma não encontrada:', nodeId);
    }
  }, []);

  const handleNoteChange = (id: number, notes: string) => {
    setEquipment(prevEquipment =>
      prevEquipment.map(eq => (eq.id === id ? { ...eq, notes } : eq))
    );
  };

  const handleModelChange = (id: number, model: string) => {
    setEquipment(prevEquipment =>
      prevEquipment.map(eq => (eq.id === id ? { ...eq, model } : eq))
    );
  };

  const handleModelImageChange = (modelName: string, imageUrl: string) => {
    setCustomEquipmentImages(prev => ({
      ...prev,
      [modelName]: imageUrl,
    }));
  };
  
  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const getStarted = () => {
    handleNavigation('problem_selection');
  };

  const renderStartScreen = () => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-brand-cool-gray-200/80 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-brand-cool-gray-900 mb-4">Bem-vindo à Ferramenta de Suporte HNET</h2>
        <p className="text-brand-cool-gray-600 mb-10 text-lg max-w-md mx-auto">
            Esta ferramenta irá guiá-lo no diagnóstico e resolução de problemas de internet dos clientes.
        </p>
        <button
            onClick={getStarted}
            className="bg-gradient-to-br from-brand-primary-600 to-brand-accent-500 text-white font-bold py-4 px-10 rounded-xl hover:from-brand-primary-700 hover:to-brand-accent-600 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-primary-300"
        >
            Iniciar Atendimento
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cool-gray-50 text-brand-cool-gray-900">
      <Header />
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentNodeId === 'start' && renderStartScreen()}
            {currentNodeId !== 'start' && (
              <FlowchartNode
                node={currentNode}
                onNavigate={handleNavigation}
                onReset={handleReset}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <EquipmentPanel 
              equipment={equipment} 
              onNoteChange={handleNoteChange}
              onModelChange={handleModelChange}
              onImageChange={handleModelImageChange}
              onImageClick={handleImageClick}
              customImages={customEquipmentImages}
            />
          </div>
        </div>
      </main>
      {modalImage && <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />}
    </div>
  );
};

export default App;