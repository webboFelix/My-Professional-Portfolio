import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import postsRoutes from './routes/posts.routes.js';
import labsRoutes from './routes/labs.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import logsRoutes from './routes/logs.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.set('trust proxy', 1);

app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'online', service: 'cyber-portfolio-api', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/labs', labsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/logs', logsRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

export default app;
