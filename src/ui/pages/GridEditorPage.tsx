import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { distributeProductsInRows } from '@/application/useGridManager';
import { buildGridPayload } from '@/application/useSaveGrid';
import {
  getProducts,
  getTemplates,
  saveGrid,
} from '@/infraestructure/server/api';
import { Row } from '@/domain/grid';
import Grid from '@/ui/components/Grid';
import Spinner from '@/ui/components/Spinner';
import ErrorMessage from '@/ui/components/ErrorMessage';
import { createEmptyRow, generateGridName } from '@/utils/gridEditor';
import '@ui/assets/styles/grid.scss';
import AlertMessage from '../components/AlertMessage';

export default function Editor() {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : [];
  const [rows, setRows] = useState<Row[]>([]);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning';
  }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [zoom, setZoom] = useState(1);
  const isZoomed = zoom !== 1;

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: isErrorInProducts,
  } = useQuery({
    queryKey: ['products', ids],
    queryFn: () => getProducts(ids),
  });

  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
    isError: isErrorInTemplates,
  } = useQuery({
    queryKey: ['templates'],
    queryFn: () => getTemplates(),
  });

  useEffect(() => {
    if (products.length > 0) {
      const gridProducts = distributeProductsInRows(products);
      setRows(gridProducts);
    }
  }, [products]);

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

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

  function zoomIn() {
    setZoom((prev) => Math.min(prev + 0.2, 1));
  }

  function zoomOut() {
    setZoom((prev) => Math.max(prev - 0.2, 0.1));
  }

  function resetZoom() {
    setZoom(1);
  }

  if (isLoadingProducts || isLoadingTemplates) return <Spinner />;
  if (isErrorInProducts || isErrorInTemplates)
    return <ErrorMessage message="An error ocurred =(" />;

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
          <div className="grid__zoom-controls">
            <div>
              <p>
                Use the + and – buttons to zoom in and out of the grid. Click
                Reset to return to the default view.{' '}
                {isZoomed && (
                  <strong>
                    Zoom is active — reset to interact with the grid.
                  </strong>
                )}
              </p>
            </div>
            <div className="btn-group" role="group" aria-label="Zoom controls">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => zoomOut()}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => resetZoom()}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => zoomIn()}
              >
                +
              </button>
            </div>
          </div>
        </header>

        <div
          className={`grid__zoom-wrapper ${isZoomed ? 'grid--zoomed' : ''}`}
          style={{
            transform: zoom === 1 ? 'none' : `scale(${zoom})`,
          }}
        >
          <Grid
            rows={rows}
            templates={templates}
            setRows={setRows}
            onTemplateChange={handleTemplateChange}
            onRowReorder={handleRowReorder}
          />
        </div>
        {alert.show && (
          <AlertMessage message={alert.message} type={alert.type} show={true} />
        )}
        <div className="grid__actions">
          <button className="btn btn-primary" onClick={handleSaveGrid}>
            Save Grid
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setRows((prev) => [...prev, createEmptyRow()]);
            }}
          >
            ➕ Add Empty Row
          </button>
        </div>
      </div>
    </section>
  );
}
