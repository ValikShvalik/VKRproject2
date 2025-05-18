interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export function ErrorHighlight({ enabled, onToggle }: Props) {
  return (
    <button onClick={onToggle} className="btn">
      {enabled ? "Отключить подсветку ошибок" : "Включить подсветку ошибок"}
    </button>
  );
}
