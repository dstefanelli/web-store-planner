import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Product } from '@/domain/product';

export interface Props {
  product: Product;
  rowId: string;
}

export default function ProductCard({ product, rowId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${rowId}:${product.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div
      className="grid__item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        className="grid__item-image"
        src={product.image}
        alt={product.name}
        width={100}
      />
      <div className="grid__item-description">
        <p className="grid__item-title">{product.name}</p>
        <p className="grid__item-price">€{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
