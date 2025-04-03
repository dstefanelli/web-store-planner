import '@/ui/assets/styles/errors.scss';

export interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="error__message">
      <img
        className="error__message-image"
        src="./images/error.svg"
        alt="Error Robot"
      />
      <h4 className="error__message-title">{message}</h4>
    </div>
  );
}
