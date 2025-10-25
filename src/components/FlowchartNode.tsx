import React from 'react';
import { FlowchartNode as FlowchartNodeType } from '../types';
import { ArrowPathIcon } from './Icons';

interface FlowchartNodeProps {
  node: FlowchartNodeType;
  onNavigate: (nodeId: string) => void;
  onReset: () => void;
}

const getButtonStyle = (style: 'primary' | 'secondary' | 'danger' | undefined) => {
    switch (style) {
        case 'danger':
            return 'bg-red-600 hover:bg-red-700 focus:ring-red-300';
        case 'secondary':
            return 'bg-brand-accent-500 hover:bg-brand-accent-600 focus:ring-brand-accent-300';
        default:
            return 'bg-brand-primary-600 hover:bg-brand-primary-700 focus:ring-brand-primary-300';
    }
}

const FlowchartNode: React.FC<FlowchartNodeProps> = ({ node, onNavigate, onReset }) => {
  if (!node) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold text-red-600">Erro no Fluxograma</h3>
        <p className="text-gray-600 mt-2">A etapa solicitada não foi encontrada. Por favor, reinicie o atendimento.</p>
        <button onClick={onReset} className="mt-4 bg-brand-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary-700 transition-colors flex items-center mx-auto">
          <ArrowPathIcon className="h-5 w-5 mr-2"/>
          Reiniciar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl animate-fade-in border border-brand-cool-gray-200/80">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-cool-gray-900">{node.title}</h3>
      </div>
      
      <div className="text-brand-cool-gray-700 text-base leading-relaxed max-w-none">
        {typeof node.text === 'string' ? <p>{node.text}</p> : node.text}
      </div>

      <div className="mt-8 border-t border-brand-cool-gray-200 pt-6">
        {node.options && (
          <div className="space-y-3">
            <p className="font-semibold text-brand-cool-gray-600 mb-3 text-sm">Selecione uma opção:</p>
            {node.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onNavigate(option.nextNodeId)}
                className={`w-full text-left text-white font-semibold py-3 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${getButtonStyle(option.style)}`}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
        {node.nextNodeId && (
          <button
            onClick={() => onNavigate(node.nextNodeId as string)}
            className={`w-full flex justify-center items-center gap-2 bg-brand-primary-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-brand-primary-700 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-primary-300`}
          >
            Próximo Passo
          </button>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
            onClick={onReset}
            className="text-sm text-brand-cool-gray-500 hover:text-brand-primary-700 font-medium transition-colors flex items-center"
        >
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            Reiniciar Fluxo
        </button>
      </div>
    </div>
  );
};

export default FlowchartNode;