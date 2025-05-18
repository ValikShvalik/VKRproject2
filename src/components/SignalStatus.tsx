import React from "react";
import { type Message } from "../data/messages";
import { detectSignalEvents } from "../lib/utils";

interface Props {
  messages: Message[];
}

const SignalStatus: React.FC<Props> = ({ messages }) => {
  const { connectedIds, disconnectedIds } = detectSignalEvents(messages);

  return (
    <div className="my-4">
      <h3 className="font-semibold mb-2">Статус сигнала</h3>
      <div>
        <strong>Подключения (ID сообщений): </strong> {connectedIds.join(", ") || "нет"}
      </div>
      <div>
        <strong>Отключения (ID сообщений): </strong> {disconnectedIds.join(", ") || "нет"}
      </div>
    </div>
  );
};

export default SignalStatus;
