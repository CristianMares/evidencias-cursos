import http from 'node:http';
import { readFileSync } from 'node:fs';

const ditto = JSON.parse(readFileSync('./pokemon/ditto.json', 'utf-8'));
const PORT = process.env.PORT ?? 1234;

// Cada peticion trae un metodo (GET, POST...) y una url. Segun eso se decide que responder.
const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(ditto));

        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          // El cuerpo llega en pedazos (chunks): se van juntando y se procesan al terminar.
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              data.timestamp = Date.now();
              res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify(data));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ error: 'El cuerpo debe ser un JSON valido' }));
            }
          });
          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end('404 No encontrado');
      }
      break;

    default:
      res.statusCode = 405;
      res.end('Metodo no permitido');
  }
};

const server = http.createServer(processRequest);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
