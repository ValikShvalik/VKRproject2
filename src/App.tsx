import React, { useState } from 'react';
import type { ChartType } from './types';
import PieChartTypeDistribution from './components/PieChartTypeDistribution';
import BarChartSignalTimeline from './components/BarChartSignalTimeline';
import HeatmapDeviceStatus from './components/HeatmapDeviceStatus';
import { FilterControls } from './components/FilterControls';
import MessageTable from './components/MessageTable';

type Tab = 'chart' | 'table' | 'logs';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('chart');
  const [chartType, setChartType] = useState<ChartType>('pie');

  const [filters, setFilters] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
    '2': true,
    errors: true,
    connect: true,
    disconnect: true,
    ПСК_CH1: true,
    ПСК_CH2: true,
    ПСК_CH3: true,
    СКУ_CH1: true,
    СКУ_CH2: true,
    СКУ_CH3: true,
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

      {/* Контент */}
      {tab === 'chart' && (
        <>
          {/* Переключатель типа графика */}
          <div className="flex gap-2 mb-4">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="p-2 border rounded"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
              <option value="heatmap">Тепловая карта</option>
            </select>
          </div>

          {/* Графики */}
          {chartType === 'pie' && <PieChartTypeDistribution filters={filters} />}
          {chartType === 'bar' && <BarChartSignalTimeline filters={filters} />}
          {chartType === 'heatmap' && <HeatmapDeviceStatus filters={filters} />}

          {/* Панель фильтров */}
          <FilterControls
            currentChart={chartType}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </>
      )}

      {tab === 'table' && (
        <>
          <MessageTable messages={[]} filterTypes={[]} />
        </>
      )}

      {tab === 'logs' && <div>Раздел логов (в разработке)</div>}
    </div>
  );
};

export default App;
