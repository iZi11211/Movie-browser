// src/components/ErrorBanner.tsx

interface Props {
  message?: string;

  onRetry?: () => void;
}

export function ErrorBanner({
  message = 'Wystąpił błąd',
  onRetry,
}: Props) {
  return (
    <div className="error-banner">
      <h2>
        Coś poszło nie tak
      </h2>

      <p>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
        >
          Spróbuj ponownie
        </button>
      )}
    </div>
  );
}