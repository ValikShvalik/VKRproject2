import React, { useState, useEffect } from 'react';

interface FilterControlsProps {
  filters: Record<string, any>; // расширили any, т.к. там теперь часы тоже
  onChange: (key: string, value: any) => void;
  mode?: 'types' | 'timeline'; // для выбора фильтров
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onChange, mode = 'types' }) => {
  const [open, setOpen] = useState(false);

  // Для выбора часов диапазона времени гистограммы
  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8..19

  // Контролируем локальное состояние для часов, чтобы UI был отзывчив
  // Значения берем из filters, если есть, иначе дефолт
  const [startHour, setStartHour] = useState<number>(filters.startHour ?? 8);
  const [endHour, setEndHour] = useState<number>(filters.endHour ?? 19);

  // При изменении локального состояния часов, отправляем наверх
  useEffect(() => {
    if (startHour > endHour) {
      // если старт стал больше конца — корректируем конец
      onChange('endHour', startHour);
      setEndHour(startHour);
    }
    onChange('startHour', startHour);
  }, [startHour]);

  useEffect(() => {
    if (endHour < startHour) {
      onChange('startHour', endHour);
      setStartHour(endHour);
    }
    onChange('endHour', endHour);
  }, [endHour]);

  // Проверяем, что хотя бы один фильтр включен (для типов)
  const anyTypeFilterOn = ['errors', '0', '1', '2'].some(key => filters[key]);

  return (
    <div className="relative inline-block text-left mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 border rounded shadow hover:bg-gray-100"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Фильтры
      </button>

      {open && (
        <div
          className="absolute mt-2 w-56 bg-white border border-gray-300 rounded shadow-lg z-50 p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-menu"
        >
          {mode === 'types' && (
            <>
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
            </>
          )}

          {mode === 'timeline' && (
            <>
              <div className="mb-2 font-semibold">Диапазон времени (часы):</div>
              <div className="flex gap-2 items-center mb-2">
                <label>
                  С:
                  <select
                    value={startHour}
                    onChange={e => setStartHour(Number(e.target.value))}
                    className="ml-1 border rounded p-1"
                  >
                    {hours.map(h => (
                      <option key={h} value={h}>
                        {h}:00
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  По:
                  <select
                    value={endHour}
                    onChange={e => setEndHour(Number(e.target.value))}
                    className="ml-1 border rounded p-1"
                  >
                    {hours.map(h => (
                      <option key={h} value={h}>
                        {h}:00
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-2 font-semibold">Типы сообщений:</div>

              {/* Повторяем фильтры по типам, чтобы можно было комбинировать */}
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
            </>
          )}
        </div>
      )}

      {mode === 'types' && !anyTypeFilterOn && (
        <div className="mt-2 text-sm text-red-600 font-semibold">
          Нет выбранных фильтров — данные не отображаются
        </div>
      )}
    </div>
  );
};

export default FilterControls;
