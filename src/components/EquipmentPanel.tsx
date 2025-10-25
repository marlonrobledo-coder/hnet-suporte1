import React, { useState, useRef } from 'react';
import { Equipment, EquipmentModel } from '../types';
import { ExclamationCircleIcon, XCircleIcon, CameraIcon } from './Icons';
import { ONU_MODELS_DATA, ROUTER_MODELS_DATA } from '../constants';

interface EquipmentCardProps {
    equipment: Equipment;
    onNoteChange: (id: number, notes: string) => void;
    onModelChange: (id: number, model: string) => void;
    onImageChange: (modelName: string, imageUrl: string) => void;
    onImageClick: (imageUrl: string) => void;
    customImages: { [modelName: string]: string };
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onNoteChange, onModelChange, onImageChange, onImageClick, customImages }) => {
    const isONU = equipment.type === 'ONU';
    const [notes, setNotes] = useState(equipment.notes);
    const modelOptions: EquipmentModel[] = isONU ? ONU_MODELS_DATA : ROUTER_MODELS_DATA;
    const selectedModelData = modelOptions.find(m => m.name === equipment.model);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageUrl = customImages[equipment.model] || selectedModelData?.imageUrl;

    const handleNotesBlur = () => {
        onNoteChange(equipment.id, notes);
    };

    const handleModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onModelChange(equipment.id, e.target.value);
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    onImageChange(equipment.model, reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const StatusIcon = () => {
        switch (equipment.status) {
            case 'Online':
                return <span className="h-3 w-3 bg-green-500 rounded-full block animate-pulse-slow" aria-hidden="true"></span>;
            case 'Offline':
                return <XCircleIcon className="h-5 w-5 text-red-500" />;
            case 'Alerta':
                return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
            default:
                return null;
        }
    }

    return (
        <div className="bg-white p-4 rounded-xl border border-brand-cool-gray-200/80 transition-shadow duration-300 hover:shadow-lg hover:border-brand-cool-gray-300/80">
            <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-brand-cool-gray-800 text-lg">{equipment.type}</p>
                <div className="flex items-center bg-brand-cool-gray-100 rounded-full px-3 py-1 text-sm">
                    <StatusIcon />
                    <span className="ml-2 font-medium text-brand-cool-gray-700">{equipment.status}</span>
                </div>
            </div>

            <div className="space-y-4">
                 <div>
                    <label htmlFor={`model-${equipment.id}`} className="block text-sm font-medium text-brand-cool-gray-600 mb-1">
                        Modelo
                    </label>
                    <select
                        id={`model-${equipment.id}`}
                        value={equipment.model}
                        onChange={handleModelSelectChange}
                        className="text-sm text-brand-cool-gray-800 border-brand-cool-gray-300 rounded-md focus:ring-brand-primary-500 focus:border-brand-primary-500 mt-1 block w-full shadow-sm"
                    >
                        {modelOptions.map(modelData => (
                            <option key={modelData.name} value={modelData.name}>{modelData.name}</option>
                        ))}
                    </select>
                 </div>

                {imageUrl && (
                    <div className="mt-3 bg-brand-cool-gray-50 p-2 rounded-lg border border-brand-cool-gray-200 flex justify-center items-center">
                        <img 
                            src={imageUrl} 
                            alt={equipment.model}
                            className="object-contain h-32 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => onImageClick(imageUrl)}
                        />
                    </div>
                )}
            </div>
            
            <div className="mt-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center text-sm font-medium text-brand-accent-700 hover:text-brand-accent-900 bg-brand-accent-50 hover:bg-brand-accent-100 border border-brand-accent-200 rounded-md py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent-500"
                >
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Adicionar/Alterar Foto
                </button>
            </div>

            <div className='mt-4'>
                <label htmlFor={`notes-${equipment.id}`} className="block text-sm font-medium text-brand-cool-gray-600 mb-1">
                    Anotações
                </label>
                <textarea
                    id={`notes-${equipment.id}`}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleNotesBlur}
                    rows={3}
                    placeholder="Adicionar notas sobre o equipamento..."
                    className="w-full p-2 border border-brand-cool-gray-300 rounded-md focus:ring-brand-primary-500 focus:border-brand-primary-500 text-sm shadow-sm"
                ></textarea>
            </div>
        </div>
    )
}


interface EquipmentPanelProps {
  equipment: Equipment[];
  onNoteChange: (id: number, notes: string) => void;
  onModelChange: (id: number, model: string) => void;
  onImageChange: (modelName: string, imageUrl: string) => void;
  onImageClick: (imageUrl: string) => void;
  customImages: { [modelName: string]: string };
}

const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ equipment, onNoteChange, onModelChange, onImageChange, onImageClick, customImages }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl space-y-6 border border-brand-cool-gray-200/80">
      <h3 className="text-xl font-bold text-brand-cool-gray-900 border-b border-brand-cool-gray-200 pb-4">Equipamentos do Cliente</h3>
      <div className="space-y-5">
        {equipment.map(eq => (
          <EquipmentCard 
            key={eq.id} 
            equipment={eq} 
            onNoteChange={onNoteChange} 
            onModelChange={onModelChange} 
            onImageChange={onImageChange} 
            onImageClick={onImageClick}
            customImages={customImages}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentPanel;