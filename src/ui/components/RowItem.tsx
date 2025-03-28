import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import ProductCard from './ProductCard';

export interface Props {
  row: Row;
  templates: Template[];
}

export default function RowItem({ row }: Props) {
  return (
    <div>
      {row.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
