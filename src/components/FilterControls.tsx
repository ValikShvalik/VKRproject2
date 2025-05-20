import React, { useState, useEffect } from 'react';

interface FilterControlsProps {
  filters: Record<string, any>;
  onChange: (key: string, value: any) => void;
  mode?: 'types' | 'timeline' | 'line';
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onChange, mode = 'types' }) => {
  const [open, setOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const [startHour, setStartHour] = useState<number>(filters.startHour ?? 8);
  const [endHour, setEndHour] = useState<number>(filters.endHour ?? 19);

  const [minTask, setMinTask] = useState<number>(filters.minTask ?? 0);
  const [maxTask, setMaxTask] = useState<number>(filters.maxTask ?? 100);

  useEffect(() => {
    setStartHour(filters.startHour ?? 8);
    setEndHour(filters.endHour ?? 19);
    setMinTask(filters.minTask ?? 0);
    setMaxTask(filters.maxTask ?? 100);
  }, [filters.startHour, filters.endHour, filters.minTask, filters.maxTask]);

  useEffect(() => {
    if (startHour > endHour) {
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

  useEffect(() => {
    if (minTask > maxTask) {
      onChange('maxTask', minTask);
      setMaxTask(minTask);
    }
    onChange('minTask', minTask);
  }, [minTask]);

  useEffect(() => {
    if (maxTask < minTask) {
      onChange('minTask', maxTask);
      setMinTask(maxTask);
    }
    onChange('maxTask', maxTask);
  }, [maxTask]);

  const anyTypeFilterOn = ['errors', '2', '1', '0'].some(key => filters[key]);

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
          className="absolute mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50 p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-menu"
        >
          {(mode === 'types' || mode === 'timeline') && (
            <>
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
                          <option key={h} value={h}>{h}:00</option>
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
                          <option key={h} value={h}>{h}:00</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </>
              )}

              <div className="mb-2 font-semibold">Типы сообщений:</div>
              {['errors', '2', '1', '0'].map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer mb-1">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={(e) => onChange(key, e.target.checked)}
                  />
                  {{
                    errors: 'Ошибки',
                    '2': 'Отрицательные',
                    '1': 'Положительные',
                    '0': 'Нейтральные',
                  }[key]}
                </label>
              ))}
            </>
          )}

          {mode === 'line' && (
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
                      <option key={h} value={h}>{h}:00</option>
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
                      <option key={h} value={h}>{h}:00</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-2 font-semibold">Диапазон задач:</div>
              <div className="flex gap-2 items-center">
                <label>
                  От:
                  <input
                    type="number"
                    value={minTask}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setMinTask(val);
                    }}
                    className="ml-1 border rounded p-1 w-20"
                  />
                </label>
                <label>
                  До:
                  <input
                    type="number"
                    value={maxTask}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setMaxTask(val);
                    }}
                    className="ml-1 border rounded p-1 w-20"
                  />
                </label>
              </div>
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
