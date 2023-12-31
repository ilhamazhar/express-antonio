import express, { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';

const router = express.Router();

export default (): Router => {
  authRouter(router);
  userRouter(router);
  return router;
};
