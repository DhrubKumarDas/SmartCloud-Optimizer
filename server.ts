import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './server/authRoutes.ts';
import { findUserByEmail, createUser } from './server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // In Cloud Run or production deployment, dist directory is built and serves the client
  const distPath = path.resolve(__dirname, 'dist');
  const distExists = fs.existsSync(distPath);
  const isCloudRun = Boolean(process.env.K_SERVICE || process.env.K_REVISION);
  const isProd = process.env.NODE_ENV === 'production' || isCloudRun || (distExists && process.env.NODE_ENV !== 'development');

  app.use(express.json());
  app.use(cookieParser());

  // Mount Comprehensive Health & Liveness Endpoints for Cloud Run, Kubernetes, and Nginx
  const healthHandler = (_req: express.Request, res: express.Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'Remix SmartCloud Optimizer Backend',
      environment: isProd ? 'production' : 'development',
      cloudRun: isCloudRun,
      timestamp: new Date().toISOString()
    });
  };

  app.get('/health', healthHandler);
  app.get('/healthz', healthHandler);
  app.get('/livez', healthHandler);
  app.get('/readyz', healthHandler);
  app.get('/api/health', healthHandler);

  // Mount Authentication & Protected Backend APIs
  app.use('/api/auth', authRoutes);

  // Mount Vite in development or static assets in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    if (distExists) {
      app.use(express.static(distPath));
    }
    app.get('*', (_req, res) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send(`<!doctype html><html lang="en"><head><title>Remix SmartCloud Optimizer</title></head><body><div id="root">SmartCloud Optimizer service is running.</div></body></html>`);
      }
    });
  }

  // Bind listener immediately so Cloud Run health check passes instantly
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Remix SmartCloud Optimizer running on http://0.0.0.0:${PORT} [${isProd ? 'production' : 'development'}]`);
  });

  // Seed demo administrator in background without blocking server startup
  (async () => {
    try {
      const demoEmail = 'admin@smartcloud.io';
      if (!findUserByEmail(demoEmail)) {
        await createUser('Neha Sharma', demoEmail, 'FinOps2026!');
        console.log(`[Auth] Seeded demo administrator: ${demoEmail}`);
      }
    } catch (err) {
      console.warn('[Auth] Non-fatal demo user check warning:', err);
    }
  })();

  const gracefulShutdown = (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

startServer().catch(err => {
  console.error('Fatal error starting SmartCloud server:', err);
  process.exit(1);
});
