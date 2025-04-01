import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import SortableProduct from '@/ui/components/SortableProduct';
import { getTemplateAlignment } from '@/utils/templates';

export interface Props {
  row: Row;
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
}

export default function RowItem({ row, templates, onTemplateChange }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onTemplateChange(row.id, e.target.value);
  }

  return (
    <div className="grid__row">
      <div className="grid__row-controls">
        <div className="row__header">
          <select
            value={row.selectedTemplateId}
            className="form-select form-select-sm"
            aria-label="Select a template"
            onChange={handleChange}
          >
            <option value={templates[0].id}>Select a template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <SortableContext
        items={row.products.map((product) => `${row.id}:${product.id}`)}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className={`grid__row-inner grid__row-content-${getTemplateAlignment(
            row.selectedTemplateId,
            templates,
          )}`}
        >
          {row.products.map((product) => (
            <SortableProduct
              key={product.id}
              product={product}
              rowId={row.id}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
