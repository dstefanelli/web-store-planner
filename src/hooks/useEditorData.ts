import { useQuery } from '@tanstack/react-query';
import { getProducts, getTemplates } from '@/infraestructure/server/api';

export function useEditorData(ids: string[]) {
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
  return {
    products,
    templates,
    isLoading: isLoadingProducts || isLoadingTemplates,
    isError: isErrorInProducts || isErrorInTemplates,
  };
}
