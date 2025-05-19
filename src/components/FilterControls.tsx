import React, { useState } from 'react';
import type { ChartType } from '../types';

interface FilterControlsProps {
  currentChart: ChartType;
  filters: Record<string, boolean>;
  onFilterChange: (key: string, value: boolean) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ currentChart, filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleToggleFilter = (key: string) => {
    onFilterChange(key, !filters[key]);
  };

  const renderControls = () => {
    switch (currentChart) {
      case 'pie':
        return ['0', '1', '2', 'errors'].map(key => (
          <label key={key} className="flex items-center gap-2">
            <input type="checkbox" checked={filters[key]} onChange={() => handleToggleFilter(key)} />
            {key === 'errors' ? 'Ошибки' : `Тип ${key}`}
          </label>
        ));
      case 'bar':
        return ['0', '1', '2'].map(key => (
          <label key={key} className="flex items-center gap-2">
            <input type="checkbox" checked={filters[key]} onChange={() => handleToggleFilter(key)} />
            {`Тип ${key}`}
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="absolute right-4 top-20 z-50">
      <button
        className="text-lg bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
        onClick={toggle}
      >
        {isOpen ? '×' : '›'}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white border border-gray-300 rounded shadow-md space-y-2 text-black">
          <h4 className="font-semibold mb-2">Фильтры</h4>
          {renderControls()}
        </div>
      )}
    </div>
  );
};
