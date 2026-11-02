import net from 'node:net';

// Intenta usar el puerto pedido. Si esta ocupado (EADDRINUSE), pide uno libre al sistema (puerto 0).
export function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then((port) => resolve(port));
      } else {
        reject(err);
      }
    });
  });
}
