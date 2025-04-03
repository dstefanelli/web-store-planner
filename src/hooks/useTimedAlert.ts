import { useState, useEffect } from 'react';

export type AlertType = 'success' | 'error' | 'warning';

export function useTimedAlert() {
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: AlertType;
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

  return { alert, setAlert };
}
