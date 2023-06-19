// Library imports
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
// Own function
import connectDB from './config/dbConnection';
import router from './router';

const startServer = async () => {
  await connectDB();

  const app = express();
  const port = process.env.SERVER_PORT || 8000;

  app.use(compression());
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api', router());
  app.use(
    cors({
      credentials: true,
    })
  );

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
