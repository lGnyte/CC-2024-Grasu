import { createServer } from 'http';
import { loadCustomers, showEndpoints } from './utils.js';

const PORT = 5000;

const server = createServer((req, res) => {

  if(req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(showEndpoints());
    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: 'Not Found' }));
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});