import { createServer, Model } from 'miragejs';
import products from './data/products.json';
import templates from './data/templates.json';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      product: Model,
      templates: Model,
    },

    seeds(server) {
      products.forEach((p) => server.create('product', p));
      templates.forEach((p) => server.create('template', p));
    },

    routes() {
      this.namespace = 'api';

      // GET: api/products/?ids=1,2,3
      this.get('/products', (schema, request) => {
        const idsParam = request.queryParams.ids;

        let ids: string[] = [];

        if (typeof idsParam === 'string') {
          ids = idsParam.split(',');
        } else if (Array.isArray(idsParam)) {
          ids = idsParam;
        }

        if (ids.length) {
          const allProducts = schema.all('product').models;
          const filteredProducts = allProducts.filter(
            (product) => product.id && ids.includes(product.id),
          );
          return filteredProducts;
        }

        return schema.all('product');
      });

      // GET: api/templates/
      this.get(
        '/templates',
        (schema, _request) => {
          return schema.all('templates');
        },
        { timing: 800 }, // Simulate API response
      );
    },
  });
}
