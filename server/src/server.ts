import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import connectDB from '@config/db';
import taskRoutes from '@routes/taskRoutes';
import userRoutes from '@routes/userRoutes';


dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler 
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export { app };
