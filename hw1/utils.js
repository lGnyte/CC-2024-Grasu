import { readFileSync } from 'fs';
import parser from 'xml2json';

export const loadCustomers = () => {
  const data = readFileSync('data/customers.xml', 'utf8');
  const json = parser.toJson(data);
  return json;
};

export const loadProducts = () => {
  const data = readFileSync('data/products.xml', 'utf8');
  const json = parser.toJson(data);
  return json;
}

export const loadOrders = () => {
  const data = readFileSync('data/orders.xml', 'utf8');
  const json = parser.toJson(data);
  return json;
}

export const showEndpoints = () => {
  return JSON.stringify({
    endpoints: [
      { path: '/', method: 'GET', description: 'Returns an empty JSON object' },
      { path: '/customers', method: 'GET', description: 'Returns a list of customers' },
      { path: '/products', method: 'GET', description: 'Returns a list of products' },
      { path: '/orders', method: 'GET', description: 'Returns a list of orders' },
    ]
  });
}
