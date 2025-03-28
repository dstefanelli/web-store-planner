import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import RowItem from '@/ui/components/RowItem';

export interface Props {
  rows: Row[];
  templates: Template[];
}
export default function Grid({ rows, templates }: Props) {
  return (
    <div>
      <div className="grid__items">
        {rows.map((row) => (
          <RowItem key={row.id} row={row} templates={templates} />
        ))}
      </div>
      <div>{}</div>
    </div>
  );
}
