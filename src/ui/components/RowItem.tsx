import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Row } from '@/domain/grid';
import { Template } from '@/domain/template';
import ProductCard from './ProductCard';

export interface Props {
  row: Row;
  templates: Template[];
  onTemplateChange: (rowId: string, templateId: string) => void;
}

export default function RowItem({ row, templates, onTemplateChange }: Props) {
  function getAlignment(templateId: string, templates: Template[]): string {
    const template = templates.find((tmp) => tmp.id === templateId);
    return template?.alignment ?? 'left'; // default: left
  }

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
            <option defaultValue="">Select a template</option>
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
          className={`grid__row-inner grid__row-content-${getAlignment(
            row.selectedTemplateId,
            templates,
          )}`}
        >
          {row.products.map((product) => (
            <ProductCard key={product.id} product={product} rowId={row.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
