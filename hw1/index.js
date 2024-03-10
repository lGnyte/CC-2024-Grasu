import { createServer } from 'http';
import { loadCustomers, loadOrders, loadProducts } from './utils.js';
import { validateNewCustomer, validateNewProduct, validateEditCustomer, validateEditProduct } from './validations.js';
import fs from 'fs';

const PORT = 5000;

const server = createServer((req, res) => {
  if(req.url === '/') {
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
    return;
  }

  if(req.url === '/customers') {
    if(req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadCustomers()));
      return;
    }
    if(req.method === 'POST') {
      let customers = loadCustomers();
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newCustomer = JSON.parse(body);
        if(!validateNewCustomer(newCustomer)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid Customer Details' }));
          return;
        }
        newCustomer.id = (customers.customers.length + 1).toString();
        customers.customers.push(newCustomer);
        fs.writeFile('data/customers.json', JSON.stringify(customers), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newCustomer));
          }
        });
      });
      return;
    }

    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    return;
  }

  if(req.url.startsWith('/customers/')) {
    if(req.method === 'GET'){
      const id = req.url.split('/')[2];
      const customers = loadCustomers();
      const customer = customers.customers.find(c => c.id === id);
      if(customer) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(customer));
        return;
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Customer Not Found' }));
      return;
    }

    if(req.method === 'PUT') {
      const id = req.url.split('/')[2];
      let customers = loadCustomers();
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newCustomer = JSON.parse(body);
        if(!validateEditCustomer(newCustomer)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid Customer Details' }));
          return;
        }
        const index = customers.customers.findIndex(c => c.id === id);
        if(index !== -1) {
          Object.keys(newCustomer).forEach(key => {
            customers.customers[index][key] = newCustomer[key];
          });
          fs.writeFile('data/customers.json', JSON.stringify(customers), (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(customers.customers[index]));
            }
          });
          return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Customer Not Found' }));
      });
      return;
    }

    if(req.method === 'DELETE') {
      const id = req.url.split('/')[2];
      let customers = loadCustomers();
      const index = customers.customers.findIndex(c => c.id === id);
      if(index !== -1) {
        customers.customers.splice(index, 1);
        fs.writeFile('data/customers.json', JSON.stringify(customers), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Customer Deleted' }));
          }
        });
        return;
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Customer Not Found' }));
      return;
    }
  }

  if(req.url === '/products') {
    if(req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadProducts()));
      return;
    }
    if(req.method === 'POST') {
      let products = loadProducts();
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newProduct = JSON.parse(body);
        if(!validateNewProduct(newProduct)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid Product Details' }));
          return;
        }
        newProduct.id = (products.products.length + 1).toString();
        products.products.push(newProduct);
        fs.writeFile('data/products.json', JSON.stringify(products), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newProduct));
          }
        });
      });
      return;
    }

    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    return;
  }

  if(req.url.startsWith('/products/')) { 
    if(req.method === 'GET'){
      const id = req.url.split('/')[2];
      const products = loadProducts();
      const product = products.products.find(p => p.id === id);
      if(product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
        return;
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
      return;
    }

    if(req.method === 'PUT') {
      const id = req.url.split('/')[2];
      let products = loadProducts();
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newProduct = JSON.parse(body);
        if(!validateEditProduct(newProduct)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid Product Details' }));
          return;
        }
        const index = products.products.findIndex(p => p.id === id);
        if(index !== -1) {
          Object.keys(newProduct).forEach(key => {
            products.products[index][key] = newProduct[key];
          });
          fs.writeFile('data/products.json', JSON.stringify(products), (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(products.products[index]));
            }
          });
          return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product Not Found' }));
      });
      return;
    }

    if(req.method === 'DELETE') {
      const id = req.url.split('/')[2];
      let products = loadProducts();
      const index = products.products.findIndex(p => p.id === id);
      if(index !== -1) {
        products.products.splice(index, 1);
        fs.writeFile('data/products.json', JSON.stringify(products), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Deleted' }));
          }
        });
        return;
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
      return;
    }
  }

  if(req.url === '/orders') {
    if(req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadOrders()));
      return;
    }
    if(req.method === 'POST') {
      res.writeHead(501, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Implemented' }));
      return;
    }

    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: 'Not Found' }));
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});