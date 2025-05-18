import React from "react";

interface Props {
  selectedTypes: number[];
  setSelectedTypes: (types: number[]) => void;
}

const allTypes = [
  { id: 0, label: "Нейтральный" },
  { id: 1, label: "Положительный" },
  { id: 2, label: "Отрицательный" },
];

const MessageFilter: React.FC<Props> = ({ selectedTypes, setSelectedTypes }) => {
  const toggleType = (id: number) => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter(t => t !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  };

  return (
    <div className="flex space-x-4 mb-4">
      {allTypes.map(t => (
        <label key={t.id} className="inline-flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedTypes.includes(t.id)}
            onChange={() => toggleType(t.id)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>{t.label}</span>
        </label>
      ))}
    </div>
  );
};

export default MessageFilter;
