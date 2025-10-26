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

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
