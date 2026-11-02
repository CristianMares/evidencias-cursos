import http from 'node:http';
import fs from 'node:fs';

const processRequest = (req, res) => {
  console.log('Peticion recibida:', req.method, req.url);

  if (req.method === 'GET') {
    switch (req.url) {
      case '/':
        // statusCode: codigo de respuesta. Content-Type: tipo de contenido (y su codificacion).
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Bienvenido a mi pagina de inicio</h1>');
        break;

      case '/imagen':
        // Se lee el archivo y se envia tal cual (es binario, no texto).
        fs.readFile('./archivos/imagen.png', (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end('<h1>500 Error interno del servidor</h1>');
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/png');
            res.end(data);
          }
        });
        break;

      case '/contacto':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Contacto</h1>');
        break;

      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>404 No encontrado</h1>');
    }
    return;
  }

  // Cualquier otro metodo en esta practica no se maneja.
  res.statusCode = 405;
  res.end('Metodo no permitido');
};

const server = http.createServer(processRequest);

server.listen(0, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`);
});
