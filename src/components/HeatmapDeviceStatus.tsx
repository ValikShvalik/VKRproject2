import React from 'react';

interface Props {
  filters: Record<string, boolean>;
}

const HeatmapDeviceStatus: React.FC<Props> = ({ filters }) => {
  const devices = [
    { name: 'ПСК', channels: ['CH1', 'CH2', 'CH3'] },
    { name: 'СКУ', channels: ['CH1', 'CH2', 'CH3'] },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-6">
        {devices.map((device) =>
          device.channels.map((ch) => {
            const key = `${device.name}_${ch}`;
            if (!filters[key]) return null;

            const statusOn = Math.random() > 0.5;

            return (
              <div key={key} className="p-4 border rounded bg-white shadow">
                <h4 className="font-semibold mb-2">{device.name} - {ch}</h4>
                <div
                  className={`w-8 h-8 rounded-full mx-auto ${
                    statusOn ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  title={`Статус: ${statusOn ? 'Вкл' : 'Выкл'}`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HeatmapDeviceStatus;
