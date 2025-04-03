import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Product } from '@/domain/product';
import ProductCard from '@/ui/components/molecules/ProductCard';

interface Props {
  product: Product;
  rowId: string;
}

export default function SortableProduct({ product, rowId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${rowId}:${product.id}`,
    data: { type: 'product' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  const className = `grid__item ${isDragging ? 'grid__item-active' : ''}`;

  return (
    <div className={className} ref={setNodeRef} style={style}>
      <ProductCard product={product} dragHandle={{ attributes, listeners }} />
    </div>
  );
}
