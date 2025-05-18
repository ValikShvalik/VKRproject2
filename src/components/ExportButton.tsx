import React from "react";
import * as XLSX from "xlsx";
import type { Message } from "../types";
import { isErrorMessage } from "../lib/utils";

interface Props {
  messages: Message[];
}

const ExportErrorsButton: React.FC<Props> = ({ messages }) => {
  const exportErrors = () => {
    const errorMessages = messages.filter(m => isErrorMessage(m.text));
    const ws = XLSX.utils.json_to_sheet(errorMessages);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Errors");
    XLSX.writeFile(wb, "errors.xlsx");
  };

  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      onClick={exportErrors}
    >
      Скачать ошибки в XLSX
    </button>
  );
};

export default ExportErrorsButton;
