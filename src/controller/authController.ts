import express, { Request, Response } from 'express';
import { createUser, getUserByEmail } from './../database/User';
import { authentication, random } from './../helpers';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );
    const expectedHash = authentication(user.authentication.salt, password);
    const salt = random();

    if (!email || !password) {
      return res.sendStatus(400);
    }
    if (!user) {
      return res.sendStatus(400);
    }
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie('AZHAR-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { roleId, name, username, email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    const salt = random();

    if (!roleId || !name || !username || !email || !password) {
      return res.sendStatus(400).json({ msg: 'Semua data harus diisi.' });
    }
    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      roleId,
      name,
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export { login, register };
