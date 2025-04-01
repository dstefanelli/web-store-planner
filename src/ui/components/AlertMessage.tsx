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
    <div className={`alert ${className}`} role="alert">
      <div>{message}</div>
    </div>
  );
}
