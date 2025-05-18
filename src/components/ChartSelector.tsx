import React, { useState } from 'react';

interface Props {
  onSelect: (type: string) => void;
}

const ChartSelector: React.FC<Props> = ({ onSelect }) => {
  const [selected, setSelected] = useState('pie');

  const handleSelect = (type: string) => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="flex justify-end gap-4 p-4">
      <select
        value={selected}
        onChange={(e) => handleSelect(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="pie">Круговая диаграмма</option>
        <option value="bar">Гистограмма</option>
        <option value="heatmap">Тепловая карта</option>
      </select>
    </div>
  );
};

export default ChartSelector;
