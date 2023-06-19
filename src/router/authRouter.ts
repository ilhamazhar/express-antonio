import { Router } from 'express';
import { login, register } from './../controller/authController';

export default (router: Router) => {
  router.post('/auth/login', login);
  router.post('/auth/register', register);
};
