import { readFileSync } from 'fs';

export const loadCustomers = () => {
  let customers = [];
  try {
    const data = readFileSync('data/customers.json', 'utf8');
    customers = JSON.parse(data);
  } catch (error) {
    console.error('Error reading customers.json', error);
  } finally {
    return customers;
  }
};

export const loadProducts = () => {
  let products = [];
  try {
    const data = readFileSync('data/products.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json', error);
  } finally {
    return products;
  }
}

export const loadOrders = () => {
  let orders = [];
  try {
    const data = readFileSync('data/orders.json', 'utf8');
    orders = JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders.json', error);
  } finally {
    return orders;
  }
}
