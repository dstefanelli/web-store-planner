import { ExclamationCircle, CheckCircle } from 'react-bootstrap-icons';

interface Props {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning';
}

export default function AlertMessage({
  show,
  message,
  type = 'success',
}: Props) {
  if (!show) return null;

  const className = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
  }[type];

  return (
    <div
      className={`alert ${className} align-items-center d-flex gap-2 px-3 py-2`}
      role="alert"
    >
      {type === 'success' ? <CheckCircle /> : <ExclamationCircle />}
      <div>{message}</div>
    </div>
  );
}
