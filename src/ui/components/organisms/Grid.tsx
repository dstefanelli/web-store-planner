import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Row } from '@/domain/grid';
import { Product } from '@/domain/product';
import { Template } from '@/domain/template';
import SortableRow from '@/ui/components/molecules/SortableRow';
import ProductCard from '@/ui/components/molecules/ProductCard';
import RowOverlay from '@/ui/components/atoms/RowOverlay';

interface Props {
  rows: Row[];
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
  onRowReorder: (oldIndex: number, newIndex: number) => void;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

export default function Grid({
  rows,
  templates,
  onTemplateChange,
  onRowReorder,
  setRows,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  function handleDragStart(e: DragStartEvent) {
    const { id, data } = e.active;
    const type = data.current?.type;

    if (type === 'row') {
      setActiveRowId(id.toString());
    }

    if (type === 'product') {
      const [rowId, productId] = id.toString().split(':');
      const row = rows.find((r) => r.id === rowId);
      const product = row?.products.find((p) => p.id === productId);
      if (product) setActiveProduct(product);
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    const activeType = active.data.current?.type;

    setActiveProduct(null);
    setActiveRowId(null);

    if (!over || active.id === over.id) return;

    if (activeType === 'row') {
      const oldIndex = rows.findIndex((r) => r.id === active.id);
      const newIndex = rows.findIndex((r) => r.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        onRowReorder(oldIndex, newIndex);
      }
    }

    if (activeType === 'product') {
      const [fromRowId, fromProductId] = active.id.toString().split(':');
      const [toRowId, toProductId] = over.id.toString().split(':');

      if (fromRowId === toRowId && fromProductId !== toProductId) {
        setRows((prev) =>
          prev.map((row) => {
            if (row.id !== fromRowId) return row;

            const products = [...row.products];
            const oldIndex = products.findIndex((p) => p.id === fromProductId);
            const newIndex = products.findIndex((p) => p.id === toProductId);

            if (oldIndex === -1 || newIndex === -1) return row;

            const [moved] = products.splice(oldIndex, 1);
            products.splice(newIndex, 0, moved);

            return { ...row, products };
          }),
        );
      }
    }
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!over || !active) return;

    const activeType = active.data.current?.type;

    if (activeType !== 'product') return;

    const [fromRowId, productId] = active.id.toString().split(':');
    const [toRowId, targetProductId] = over.id.toString().split(':');

    if (!fromRowId || !toRowId || !productId) return;
    if (fromRowId === toRowId && productId === targetProductId) return;

    const fromRow = rows.find((r) => r.id === fromRowId);
    const toRow = rows.find((r) => r.id === toRowId);
    const movingProduct = fromRow?.products.find((p) => p.id === productId);
    const productToReplace = toRow?.products.find(
      (p) => p.id === targetProductId,
    );

    if (!fromRow || !toRow || !movingProduct) return;

    // Avoid duplicates
    if (toRow.products.some((p) => p.id === productId)) return;

    // Simple insertion
    if (toRow.products.length < 3) {
      setRows((prev) =>
        prev.map((row) => {
          if (row.id === fromRowId) {
            return {
              ...row,
              products: row.products.filter((p) => p.id !== productId),
            };
          }

          if (row.id === toRowId) {
            return {
              ...row,
              products: [...row.products, movingProduct],
            };
          }

          return row;
        }),
      );
      return;
    }

    // Swap is full
    if (!productToReplace) return;

    setRows((prev) =>
      prev.map((row) => {
        if (row.id === fromRowId) {
          return {
            ...row,
            products: [
              ...row.products.filter((p) => p.id !== productId),
              productToReplace,
            ],
          };
        }

        if (row.id === toRowId) {
          return {
            ...row,
            products: [
              ...row.products.filter((p) => p.id !== productToReplace.id),
              movingProduct,
            ],
          };
        }

        return row;
      }),
    );
  }

  return (
    <div className="grid__items">
      <div className="grid__list">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext
            items={rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            {rows.map((row) => (
              <SortableRow
                key={row.id}
                row={row}
                templates={templates}
                onTemplateChange={onTemplateChange}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeProduct && <ProductCard product={activeProduct} />}
            {activeRowId && <RowOverlay />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
