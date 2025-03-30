import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getTemplates } from '@/infraestructure/server/api';
import { distributeProductsInRows } from '@/application/useGridManager';
import { useSearchParams } from 'react-router';
import { Row } from '@/domain/grid';
import Grid from '@/ui/components/Grid';
import Spinner from '@/ui/components/Spinner';
import ErrorMessage from '@/ui/components/ErrorMessage';
import '@ui/assets/styles/grid.scss';

export default function Editor() {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : [];

  const [rows, setRows] = useState<Row[]>([]);

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: isErrorInProducts,
  } = useQuery({
    queryKey: ['products'],
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

  function handleTemplateChange(rowId: string, templateId: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, selectedTemplateId: templateId } : row,
      ),
    );
  }

  function handleProductReorder(
    fromRowId: string,
    toRowId: string,
    productId: string,
    newIndex: number,
  ) {
    setRows((prev) => {
      const updated = [...prev];
      const fromRow = updated.find((r) => r.id === fromRowId);
      const toRow = updated.find((r) => r.id === toRowId);

      if (!fromRow || !toRow) return prev;

      const product = fromRow.products.find((p) => p.id === productId);
      if (!product) return prev;

      if (toRow.products.some((p) => p.id === productId)) return prev;
      if (toRow.products.length >= 3 && fromRowId !== toRowId) return prev;

      // Quitar de fila original
      fromRow.products = fromRow.products.filter((p) => p.id !== productId);

      // Insertar en destino en el índice correcto
      toRow.products.splice(newIndex, 0, product);

      return updated;
    });
  }

  if (isLoadingProducts || isLoadingTemplates) return <Spinner />;
  if (isErrorInProducts || isErrorInTemplates)
    return <ErrorMessage message="An error ocurred =(" />;

  return (
    <section className="container">
      <div className="grid__wrapper">
        <h1 className="grid__title">Grid creator</h1>
        <p className="grid__description">
          The product arrangement updates instantly based on your selected
          alignment.
          <br />
          Use the dropdown in each row to choose a layout template (left,
          center, or right aligned).
        </p>
        <Grid
          rows={rows}
          templates={templates}
          onTemplateChange={handleTemplateChange}
          onProductReorder={handleProductReorder}
        />
      </div>
    </section>
  );
}
