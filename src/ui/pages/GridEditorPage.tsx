import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useEditorData } from '@/hooks/useEditorData';
import { distributeProductsInRows } from '@/application/useGridManager';
import { buildGridPayload } from '@/application/useSaveGrid';
import { saveGrid } from '@/infraestructure/server/api';
import { Row } from '@/domain/grid';
import { createEmptyRow, generateGridName } from '@/utils/gridEditor';
import { useTimedAlert } from '@/hooks/useTimedAlert';
import { PlusLg } from 'react-bootstrap-icons';
import ErrorMessage from '@/ui/components/atoms/ErrorMessage';
import AlertMessage from '@/ui/components/atoms/AlertMessage';
import ZoomWrapper from '@/ui/components/organisms/ZoomWrapper';
import Spinner from '@/ui/components/atoms/Spinner';
import Grid from '@/ui/components/organisms/Grid';
import '@ui/assets/styles/grid.scss';

export default function GridEditorPage() {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : [];
  const { products, templates, isLoading, isError } = useEditorData(ids);
  const [rows, setRows] = useState<Row[]>([]);
  const { alert, setAlert } = useTimedAlert();

  useEffect(() => {
    if (products.length > 0) {
      const gridProducts = distributeProductsInRows(products);
      setRows(gridProducts);
    }
  }, [products]);

  function handleTemplateChange(rowId: string, templateId: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, selectedTemplateId: templateId } : row,
      ),
    );
  }

  function handleRowReorder(fromIndex: number, toIndex: number) {
    setRows((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }

  async function handleSaveGrid() {
    const grid_name = generateGridName();
    try {
      const payload = buildGridPayload(grid_name, rows);
      const response = await saveGrid(payload);
      console.log(response);
      setAlert((prev) => ({
        ...prev,
        show: true,
        message: 'Grid saved successfully!',
        type: 'success',
      }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error saving grid';
      setAlert((prev) => ({
        ...prev,
        show: true,
        message: message,
        type: 'warning',
      }));
    }
  }

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message="An error ocurred =(" />;

  return (
    <section className="container">
      <div className="grid__wrapper">
        <header className="grid__header">
          <h1 className="grid__title">Grid creator</h1>
          <p className="grid__description">
            The product arrangement updates instantly based on your selected
            alignment.
            <br />
            Use the dropdown in each row to choose a layout template (left,
            center, or right aligned).
          </p>
        </header>
        <ZoomWrapper>
          <Grid
            rows={rows}
            templates={templates}
            setRows={setRows}
            onTemplateChange={handleTemplateChange}
            onRowReorder={handleRowReorder}
          />
        </ZoomWrapper>
        {alert.show && (
          <AlertMessage message={alert.message} type={alert.type} show={true} />
        )}
        <div className="grid__actions">
          <button className="btn btn-sm btn-primary" onClick={handleSaveGrid}>
            Save Grid
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setRows((prev) => [...prev, createEmptyRow()]);
            }}
          >
            <PlusLg /> Add Empty Row
          </button>
        </div>
      </div>
    </section>
  );
}
