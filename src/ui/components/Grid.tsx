import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import RowItem from '@/ui/components/RowItem';

export interface Props {
  rows: Row[];
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
}
export default function Grid({ rows, templates, onTemplateChange }: Props) {
  return (
    <div className="grid__items">
      <div className="grid__list">
        {rows.map((row) => (
          <RowItem
            key={row.id}
            row={row}
            templates={templates}
            onTemplateChange={onTemplateChange}
          />
        ))}
      </div>
    </div>
  );
}
