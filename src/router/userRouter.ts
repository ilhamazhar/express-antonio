import { Router } from 'express';
import { isAuthenticated, isDataOwner } from './../middleware';
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from './../controller/userController';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.patch('/users/:id', isAuthenticated, isDataOwner, updateUser);
  router.delete('/users/:id', isAuthenticated, isDataOwner, deleteUser);
};
