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
    queryFn: getTemplates,
  });

  useEffect(() => {
    if (products.length > 0) {
      const gridProducts = distributeProductsInRows(products);
      setRows(gridProducts);
    }
  }, [products]);

  if (isLoadingProducts || isLoadingTemplates) return <Spinner />;
  if (isErrorInProducts || isErrorInTemplates)
    return <ErrorMessage message="An error ocurred =(" />;

  return (
    <div className="container">
      <div className="grid__wrapper">
        <Grid rows={rows} templates={templates} />
      </div>
    </div>
  );
}
