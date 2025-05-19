import React, { useState } from 'react';

interface FilterControlsProps {
  filters: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onChange }) => {
  const [open, setOpen] = useState(false);

  // Проверяем, что хотя бы один фильтр включен
  const anyFilterOn = Object.values(filters).some(Boolean);

  return (
    <div className="relative inline-block text-left mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 border rounded shadow hover:bg-gray-100"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {'<'}
      </button>

      {open && (
        <div
          className="absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-menu"
        >
          <div className="p-2">
            <label className="flex items-center gap-2 cursor-pointer mb-1">
              <input
                type="checkbox"
                checked={filters.errors}
                onChange={(e) => onChange('errors', e.target.checked)}
              />
              Ошибки
            </label>
            <label className="flex items-center gap-2 cursor-pointer mb-1">
              <input
                type="checkbox"
                checked={filters['2']}
                onChange={(e) => onChange('2', e.target.checked)}
              />
              Отрицательные
            </label>
            <label className="flex items-center gap-2 cursor-pointer mb-1">
              <input
                type="checkbox"
                checked={filters['1']}
                onChange={(e) => onChange('1', e.target.checked)}
              />
              Положительные
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters['0']}
                onChange={(e) => onChange('0', e.target.checked)}
              />
              Нейтральные
            </label>
          </div>
        </div>
      )}

      {!anyFilterOn && (
        <div className="mt-2 text-sm text-red-600 font-semibold">
          Нет выбранных фильтров — данные не отображаются
        </div>
      )}
    </div>
  );
};

export default FilterControls;
