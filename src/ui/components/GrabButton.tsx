import { GripHorizontal, GripVertical } from 'react-bootstrap-icons';

export interface Props {
  alignment?: string;
  color?: string;
  size?: number;
}

export default function GrabButton({ alignment, color, size }: Props) {
  return (
    <div className="btn-grab">
      {alignment && alignment === 'vertical' ? (
        <GripVertical color={color} size={size ?? 24} />
      ) : (
        <GripHorizontal color={color} size={size ?? 24} />
      )}
    </div>
  );
}
