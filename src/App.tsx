import React, { useState } from "react";
import { messages as initialMessages, type Message } from "./data/messages";
import MessageTable from "./components/MessageTable";
import MessageFilter from "./components/MessageFilter";
import MessageChart from "./components/MessageChart";
import ExportErrorsButton from "./components/ExportErrorsButton";
import SignalStatus from "./components/SignalStatus";

const App: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<number[]>([0, 1, 2]);
  const [data] = useState<Message[]>(initialMessages);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Анализ сообщений</h1>
      <MessageFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <MessageChart messages={data.filter(m => selectedTypes.includes(m.type))} />
      <SignalStatus messages={data} />
      <div className="my-6">
        <ExportErrorsButton messages={data} />
      </div>
      <MessageTable messages={data} filterTypes={selectedTypes} />
    </div>
  );
};

export default App;
