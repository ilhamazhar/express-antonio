import { Request, Response } from 'express';
import {
  countUsers,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from './../database/User';
import { log } from 'console';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    const totalUsers = await countUsers();

    return res.status(200).json({ total: totalUsers, data: users });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    const updatedUser = await updateUserById(id, req.body);
    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export { getAllUsers, updateUser, deleteUser };
