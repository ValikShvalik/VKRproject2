import React from 'react';

const HeatmapDeviceStatus: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-4">
        {['ПСК-1', 'ПСК-2', 'СКУ-1', 'СКУ-2'].map((device) => (
          <div key={device} className="p-4 border rounded bg-gray-100">
            <h4 className="font-bold">{device}</h4>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((ch) => (
                <div
                  key={ch}
                  className={`w-8 h-8 rounded-full ${
                    Math.random() > 0.5 ? 'bg-green-400' : 'bg-red-400'
                  }`}
                  title={`Канал ${ch}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatmapDeviceStatus;
