import React, { useState } from 'react';
import type { ChartType } from './types';
import PieChartTypeDistribution from './components/PieChartTypeDistribution';
import BarChartSignalTimeline from './components/BarChartSignalTimeline';
import HeatmapDeviceStatus from './components/HeatmapDeviceStatus';
import  FilterControls  from './components/FilterControls';
import MessageTable from './components/MessageTable';
import { messages } from './data/messages';

type Tab = 'chart' | 'table' | 'logs';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('chart');
  const [chartType, setChartType] = useState<ChartType>('pie');

  // Фильтры только по нужным типам
  const [filters, setFilters] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
    '2': true,
    errors: true,
    // Другие фильтры, если нужны
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Для таблицы фильтруем по этим типам
  const filterTypesForTable = ['errors', '0', '1', '2'].filter(key => filters[key]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Вкладки */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab('chart')} className={tab === 'chart' ? 'font-bold' : ''}>Графика</button>
        <button onClick={() => setTab('table')} className={tab === 'table' ? 'font-bold' : ''}>Таблица</button>
        <button onClick={() => setTab('logs')} className={tab === 'logs' ? 'font-bold' : ''}>Логи</button>
      </div>

      {/* Графики */}
      {tab === 'chart' && (
        <div>
          {/* Выбор графика */}
          <div className="mb-4">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="border rounded p-1"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
              <option value="heatmap">Тепловая карта</option>
            </select>
          </div>
          {/* Фильтры */}
          <FilterControls filters={filters} onChange={handleFilterChange} />
          {/* Собственно графики */}
          {chartType === 'pie' && <PieChartTypeDistribution filters={filters} />}
          {chartType === 'bar' && <BarChartSignalTimeline filters={filters} />}
          {chartType === 'heatmap' && <HeatmapDeviceStatus filters={filters} />}
        </div>
      )}

      {/* Таблица */}
      {tab === 'table' && (
        <div>
          <FilterControls filters={filters} onChange={handleFilterChange} />
          <MessageTable messages={messages} filterTypes={filterTypesForTable} />
        </div>
      )}

      {/* Логи - пока можно пусто или позже добавить */}
      {tab === 'logs' && (
        <div>Здесь будут логи</div>
      )}
    </div>
  );
};

export default App;
