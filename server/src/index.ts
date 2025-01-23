import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const corsOrigins: { [key: string]: string[] } = {
  development: [
    `http://localhost:${process.env.CLIENT_PORT}`,
    'http://localhost:3000',
  ],
  production: [process.env.PRODUCTION_URL || 'https://yourdomain.com'],
};

const corsOptions = {
  origin:
    corsOrigins[
      (process.env.NODE_ENV as 'development' | 'production') || 'development'
    ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/api/version', (req: Request, res: Response) => {
  res.send('v0.0.1');
});

// API routes should be above the catchall handler
// ...existing API routes...

// 404 handler for API routes
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// The "catchall" handler for React app
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong'
        : err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
