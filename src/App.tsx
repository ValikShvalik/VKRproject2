import React, { useState } from 'react';
import type { ChartType } from './types';
import PieChartTypeDistribution from './components/PieChartTypeDistribution';
import BarChartSignalTimeline from './components/BarChartSignalTimeline';
import HeatmapDeviceStatus from './components/HeatmapDeviceStatus';
import FilterControls from './components/FilterControls';
import MessageTable from './components/MessageTable';
import { messages } from './data/messages';

type Tab = 'chart' | 'table' | 'logs';
type AnalyticsMode = 'pie' | 'bar';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('chart');
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [analyticsMode, setAnalyticsMode] = useState<AnalyticsMode>('pie'); // что анализируем для таблицы

  // Фильтры для круговой диаграммы
  const [pieFilters, setPieFilters] = useState<Record<string, boolean>>({
    errors: true,
    '0': true,
    '1': true,
    '2': true,
  });

  // Фильтры для гистограммы + фильтр по времени
  const [barFilters, setBarFilters] = useState<Record<string, boolean>>({
    errors: true,
    '0': true,
    '1': true,
    '2': true,
  });
  const [startHour, setStartHour] = useState<number>(0);
  const [endHour, setEndHour] = useState<number>(23);

  // Обработчики смены фильтров
  const handlePieFilterChange = (key: string, value: boolean) => {
    setPieFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBarFilterChange = (key: string, value: boolean) => {
    setBarFilters(prev => ({ ...prev, [key]: value }));
  };

  // Обработчик выбора аналитики для таблицы
  const handleAnalyticsModeChange = (mode: AnalyticsMode) => {
    setAnalyticsMode(mode);
  };

  // Фильтры и параметры для таблицы зависят от выбранного режима аналитики
  const filterTypesForTable =
    analyticsMode === 'pie'
      ? Object.entries(pieFilters).filter(([, v]) => v).map(([k]) => k)
      : Object.entries(barFilters).filter(([, v]) => v).map(([k]) => k);

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Вкладки */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab('chart')} className={tab === 'chart' ? 'font-bold' : ''}>
          Графика
        </button>
        <button onClick={() => setTab('table')} className={tab === 'table' ? 'font-bold' : ''}>
          Таблица
        </button>
        <button onClick={() => setTab('logs')} className={tab === 'logs' ? 'font-bold' : ''}>
          Логи
        </button>
      </div>

      {/* Графики */}
      {tab === 'chart' && (
        <div>
          {/* Выбор графика */}
          <div className="mb-4">
            <select
              value={chartType}
              onChange={e => setChartType(e.target.value as ChartType)}
              className="border rounded p-1"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
              <option value="heatmap">Тепловая карта</option>
            </select>
          </div>

          {/* Фильтры */}
          {chartType === 'pie' && <FilterControls filters={pieFilters} onChange={handlePieFilterChange} />}
          {chartType === 'bar' && (
            <div>
              <FilterControls filters={barFilters} onChange={handleBarFilterChange} />
              {/* Фильтр по времени */}
              <div className="mt-2 flex items-center gap-2">
                <label>
                  Время с:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={startHour}
                    onChange={e => {
                      let val = Number(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 23) val = 23;
                      if (val > endHour) val = endHour;
                      setStartHour(val);
                    }}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
                <label>
                  по:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={endHour}
                    onChange={e => {
                      let val = Number(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 23) val = 23;
                      if (val < startHour) val = startHour;
                      setEndHour(val);
                    }}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Собственно графики */}
          {chartType === 'pie' && <PieChartTypeDistribution filters={pieFilters} />}
          {chartType === 'bar' && (
            <BarChartSignalTimeline filters={barFilters} startHour={startHour} endHour={endHour} />
          )}
          {chartType === 'heatmap' && <HeatmapDeviceStatus filters={pieFilters} />}
        </div>
      )}

      {/* Таблица */}
      {tab === 'table' && (
        <div>
          {/* Переключатель, какую аналитику показывать */}
          <div className="mb-4">
            <label className="mr-4 font-semibold">Выберите аналитику для таблицы:</label>
            <select
              value={analyticsMode}
              onChange={e => handleAnalyticsModeChange(e.target.value as AnalyticsMode)}
              className="border rounded p-1"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
            </select>
          </div>

          {/* Фильтры для выбранной аналитики */}
          {analyticsMode === 'pie' && <FilterControls filters={pieFilters} onChange={handlePieFilterChange} />}
          {analyticsMode === 'bar' && (
            <div>
              <FilterControls filters={barFilters} onChange={handleBarFilterChange} />
              {/* Фильтр по времени */}
              <div className="mt-2 flex items-center gap-2">
                <label>
                  Время с:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={startHour}
                    onChange={e => {
                      let val = Number(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 23) val = 23;
                      if (val > endHour) val = endHour;
                      setStartHour(val);
                    }}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
                <label>
                  по:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={endHour}
                    onChange={e => {
                      let val = Number(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 23) val = 23;
                      if (val < startHour) val = startHour;
                      setEndHour(val);
                    }}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Таблица сообщений с фильтрацией по выбранным фильтрам */}
          <MessageTable
            messages={messages}
            filterTypes={filterTypesForTable}
            startHour={analyticsMode === 'bar' ? startHour : undefined}
            endHour={analyticsMode === 'bar' ? endHour : undefined}
          />
        </div>
      )}

      {/* Логи */}
      {tab === 'logs' && <div>Здесь будут логи</div>}
    </div>
  );
};

export default App;
