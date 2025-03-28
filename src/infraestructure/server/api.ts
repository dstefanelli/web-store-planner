import { Product } from '@/domain/product';
import { Template } from '@/domain/template';
import { EnvConfig } from '@/configs/env.config';

// GET: Products from ids in the provided url
export async function getProducts(ids: string[]): Promise<Product[]> {
  const { apiUrl } = EnvConfig();

  const query = ids?.length ? `?ids=${ids.join(',')}` : '';
  const productsUrl = `${apiUrl}/api/products${query}`;

  const res = await fetch(productsUrl);

  if (!res.ok) throw new Error('Error fetching products');
  const data = await res.json();
  console.log('getProducts', data);
  return Array.isArray(data) ? data : [];
}

// GET: Template list
export async function getTemplates(): Promise<Template[]> {
  const { apiUrl } = EnvConfig();

  const templatesUrl = `${apiUrl}/api/templates`;

  const res = await fetch(templatesUrl);

  if (!res.ok) throw new Error('Error fetching templates');
  const data = await res.json();
  console.log('getTemplates', data);
  return Array.isArray(data) ? data : [];
}
