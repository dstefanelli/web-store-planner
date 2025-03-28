import { Product } from '@/domain/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="grid__item">
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
