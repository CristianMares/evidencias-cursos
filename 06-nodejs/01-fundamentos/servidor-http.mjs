import http from 'node:http';

const server = http.createServer((req, res) => {
  console.log('Peticion recibida:', req.method, req.url);
  res.end('Hola mundo');
});

// Con el puerto 0 el sistema operativo asigna cualquier puerto libre.
server.listen(0, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`);
});
