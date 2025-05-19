// src/components/HeatmapDeviceStatus.tsx
import React from 'react';

interface HeatmapDeviceStatusProps {
  filters: Record<string, boolean>;
}

const channels = [
  { device: 'ПСК', ch: 'CH1' },
  { device: 'ПСК', ch: 'CH2' },
  { device: 'ПСК', ch: 'CH3' },
  { device: 'СКУ', ch: 'CH1' },
  { device: 'СКУ', ch: 'CH2' },
  { device: 'СКУ', ch: 'CH3' },
];

const HeatmapDeviceStatus: React.FC<HeatmapDeviceStatusProps> = ({ filters }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {channels.map(({ device, ch }) => {
          const key = `${device}_${ch}`;
          if (!filters[key]) return null;

          return (
            <div key={key} className="p-4 border rounded bg-gray-100">
              <h4 className="font-bold">{`${device} ${ch}`}</h4>
              <div
                className={`w-12 h-12 mt-2 rounded-full ${
                  Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'
                }`}
                title={`Состояние ${device}-${ch}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapDeviceStatus;
