import React, { useState } from 'react';
import ChartSelector from './components/ChartSelector';
import PieChartTypeDistribution from './components/PieChartTypeDistribution';
import BarChartSignalTimeline from './components/BarChartSignalTimeline';
import HeatmapDeviceStatus from './components/HeatmapDeviceStatus';
import WavifyEffect from './components/WaveSection';

function App() {
  const [activeTab, setActiveTab] = useState('graph');
  const [chartType, setChartType] = useState('pie');

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex gap-4">
        <button onClick={() => setActiveTab('graph')}>Графика</button>
        <button onClick={() => setActiveTab('table')}>Таблица</button>
        <button onClick={() => setActiveTab('logs')}>Логи</button>
      </div>

      {activeTab === 'graph' && (
        <>
          <ChartSelector onSelect={setChartType} />
          {chartType === 'pie' && <PieChartTypeDistribution />}
          {chartType === 'bar' && <BarChartSignalTimeline />}
          {chartType === 'heatmap' && <HeatmapDeviceStatus />}
          <WavifyEffect trigger={chartType === 'pie'} />
        </>
      )}

      {activeTab === 'table' && <div>Здесь будет таблица</div>}
      {activeTab === 'logs' && <div>Здесь будут логи</div>}
    </div>
  );
}

export default App;
