import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import RowItem from '@/ui/components/RowItem';

export interface Props {
  rows: Row[];
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
  onProductReorder: (
    fromRowId: string,
    toRowId: string,
    productId: string,
    newIndex: number,
  ) => void;
}
export default function Grid({
  rows,
  templates,
  onTemplateChange,
  onProductReorder,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over) return;

    const [fromRowId, productId] = active.id.toString().split(':');
    const [toRowId, targetProductId] = over.id.toString().split(':');

    if (!fromRowId || !toRowId || !productId) return;

    const toRow = rows.find((row) => row.id === toRowId);
    if (!toRow) return;

    const newIndex = toRow.products.findIndex((p) => p.id === targetProductId);

    onProductReorder(fromRowId, toRowId, productId, newIndex);
  }

  return (
    <div className="grid__items">
      <div className="grid__list">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {rows.map((row) => (
            <RowItem
              key={row.id}
              row={row}
              templates={templates}
              onTemplateChange={onTemplateChange}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
