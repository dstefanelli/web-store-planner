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
  return Array.isArray(data) ? data : [];
}

// GET: Template list
export async function getTemplates(): Promise<Template[]> {
  const { apiUrl } = EnvConfig();

  const templatesUrl = `${apiUrl}/api/templates`;

  const res = await fetch(templatesUrl);

  if (!res.ok) throw new Error('Error fetching templates');
  const data = await res.json();
  return data.templates ?? [];
}

// POST: Grid
export async function saveGrid(payload: {
  name: string;
  rows: { templateId: string; productIds: string[] }[];
}) {
  const { apiUrl } = EnvConfig();
  const url = `${apiUrl}/api/grids`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error saving grid');
  }

  return res.json();
}
