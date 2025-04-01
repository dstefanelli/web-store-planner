import { HTMLAttributes } from 'react';
import { Product } from '@/domain/product';
import GrabButton from './GrabButton';

export interface Props {
  product: Product;
  dragHandle?: {
    attributes: HTMLAttributes<HTMLElement>;
    listeners: any;
  };
}

export default function ProductCard({ product, dragHandle }: Props) {
  return (
    <div className="grid__item-inner">
      <div className="grid__item-content">
        {dragHandle && (
          <div
            className="grid__item-handle"
            {...dragHandle.attributes}
            {...dragHandle.listeners}
          >
            <GrabButton />
          </div>
        )}

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
    </div>
  );
}
