// server.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db';
import homeRoutes from './routes/home.routes';
import aboutRoutes from './routes/about.routes';

const app: Application = express();

// database conenction
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
