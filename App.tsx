import React, { useState, useCallback, useMemo } from 'react';
import { Equipment, FlowchartNode as FlowchartNodeType } from './types';
import { FLOWCHART_DATA, INITIAL_EQUIPMENT } from './constants';
import Header from './components/Header';
import FlowchartNode from './components/FlowchartNode';
import EquipmentPanel from './components/EquipmentPanel';
import ImageModal from './components/ImageModal';
import { WifiIcon } from './components/Icons';

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
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6">
            <WifiIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo à Ferramenta de Suporte HNET</h2>
        <p className="text-gray-600 mb-8 text-lg">
            Esta ferramenta irá guiá-lo no diagnóstico e resolução de problemas de internet dos clientes.
        </p>
        <button
            onClick={getStarted}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg shadow-md"
        >
            Iniciar Atendimento
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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