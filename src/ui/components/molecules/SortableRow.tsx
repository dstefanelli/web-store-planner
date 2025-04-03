import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row as RowType } from '@/domain/grid';
import { Template } from '@/domain/template';
import GrabButton from '@/ui/components/atoms/GrabButton';
import Row from '@/ui/components/organisms/Row';

interface Props {
  row: RowType;
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
}

export default function SortableRow({
  row,
  templates,
  onTemplateChange,
}: Props) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: row.id,
      data: { type: 'row' },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="grid__row-wrapper" ref={setNodeRef} style={style}>
      <div className="grid__row-wrapper-handle" {...listeners} {...attributes}>
        <GrabButton />
      </div>
      <Row
        row={row}
        templates={templates}
        onTemplateChange={onTemplateChange}
      />
    </div>
  );
}
