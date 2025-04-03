import '@/ui/assets/styles/spinner.scss';

export default function Spinner() {
  return (
    <div className="spinner__wrapper">
      <div className="spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
