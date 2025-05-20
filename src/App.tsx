import React, { useState, useMemo } from 'react';
import type { ChartType } from './types';
import PieChartTypeDistribution from './components/PieChartTypeDistribution';
import BarChartSignalTimeline from './components/BarChartSignalTimeline';
import LineChartErrorByTask from './components/LineChartErrorByTask';
import FilterControls from './components/FilterControls';
import MessageTable from './components/MessageTable';
import { messages } from './data/messages';

type Tab = 'chart' | 'table' | 'logs';
type AnalyticsMode = 'pie' | 'bar';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('chart');
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [analyticsMode, setAnalyticsMode] = useState<AnalyticsMode>('pie');

  const [pieFilters, setPieFilters] = useState<Record<string, boolean>>({
    errors: true,
    '0': true,
    '1': true,
    '2': true,
  });
  const [barFilters, setBarFilters] = useState<Record<string, boolean>>({
    errors: true,
    '0': true,
    '1': true,
    '2': true,
  });

  const [startHour, setStartHour] = useState<number>(8);
  const [endHour, setEndHour] = useState<number>(19);

  // Линейный график — только ошибки
  const [lineStartHour, setLineStartHour] = useState<number>(0);
  const [lineEndHour, setLineEndHour] = useState<number>(24);
  const [minTask, setMinTask] = useState<number>(0);
  const [maxTask, setMaxTask] = useState<number>(100);

  const handlePieFilterChange = (key: string, value: any) => {
    setPieFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBarFilterChange = (key: string, value: any) => {
    setBarFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLineFilterChange = (key: string, value: any) => {
    if (key === 'startHour') setLineStartHour(value);
    else if (key === 'endHour') setLineEndHour(value);
    else if (key === 'minTask') setMinTask(value);
    else if (key === 'maxTask') setMaxTask(value);
  };

  // Выбранные типы для таблицы
  const filterTypesForTable = useMemo(() => {
    const filters = analyticsMode === 'pie' ? pieFilters : barFilters;
    return Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k]) => k);
  }, [analyticsMode, pieFilters, barFilters]);

  // Отфильтрованные сообщения для линейного графика
  const filteredLineMessages = useMemo(() => {
    return messages.filter(msg => {
      const hour = new Date(msg.timestamp).getHours();
      return (
        msg.isError &&
        hour >= lineStartHour &&
        hour <= lineEndHour &&
        msg.taskNumber !== undefined &&
        msg.taskNumber >= minTask &&
        msg.taskNumber <= maxTask
      );
    });
  }, [lineStartHour, lineEndHour, minTask, maxTask]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Вкладки */}
      <div className="flex gap-4 mb-4">
        {(['chart', 'table', 'logs'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? 'font-bold' : ''}>
            {t === 'chart' ? 'Графика' : t === 'table' ? 'Таблица' : 'Логи'}
          </button>
        ))}
      </div>

      {/* Графики */}
      {tab === 'chart' && (
        <div>
          <div className="mb-4">
            <select
              value={chartType}
              onChange={e => setChartType(e.target.value as ChartType)}
              className="border rounded p-1"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
              <option value="line">Линейный график ошибок</option>
            </select>
          </div>

          {chartType === 'pie' && (
            <FilterControls filters={pieFilters} onChange={handlePieFilterChange} mode="types" />
          )}

          {chartType === 'bar' && (
            <>
              <FilterControls filters={barFilters} onChange={handleBarFilterChange} mode="types" />
              <div className="mt-2 flex items-center gap-2">
                <label>
                  Время с:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={startHour}
                    onChange={e => setStartHour(Math.min(Math.max(0, Number(e.target.value)), endHour))}
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
                    onChange={e => setEndHour(Math.max(Math.min(23, Number(e.target.value)), startHour))}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
              </div>
            </>
          )}

          {chartType === 'line' && (
            <>
              <FilterControls
                filters={{
                  startHour: lineStartHour,
                  endHour: lineEndHour,
                  minTask,
                  maxTask,
                }}
                onChange={handleLineFilterChange}
                mode="line"
              />
            </>
          )}

          {/* Графики */}
          {chartType === 'pie' && <PieChartTypeDistribution filters={pieFilters} />}
          {chartType === 'bar' && (
            <BarChartSignalTimeline
              filters={barFilters}
              startHour={startHour}
              endHour={endHour}
            />
          )}
          {chartType === 'line' && <LineChartErrorByTask messages={filteredLineMessages} />}
        </div>
      )}

      {/* Таблица */}
      {tab === 'table' && (
        <div>
          <div className="mb-4">
            <label className="mr-4 font-semibold">Выберите аналитику для таблицы:</label>
            <select
              value={analyticsMode}
              onChange={e => setAnalyticsMode(e.target.value as AnalyticsMode)}
              className="border rounded p-1"
            >
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Гистограмма</option>
            </select>
          </div>

          {analyticsMode === 'pie' && (
            <FilterControls filters={pieFilters} onChange={handlePieFilterChange} mode="types" />
          )}

          {analyticsMode === 'bar' && (
            <>
              <FilterControls filters={barFilters} onChange={handleBarFilterChange} mode="types" />
              <div className="mt-2 flex items-center gap-2">
                <label>
                  Время с:
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={startHour}
                    onChange={e => setStartHour(Math.min(Math.max(0, Number(e.target.value)), endHour))}
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
                    onChange={e => setEndHour(Math.max(Math.min(23, Number(e.target.value)), startHour))}
                    className="ml-1 w-14 border rounded p-1"
                  />
                </label>
              </div>
            </>
          )}

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
