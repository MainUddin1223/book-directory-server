import { jwtHelpers } from '../../jwt';
import { User } from './auth.model';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';
const { jwt_access_secret, jwt_access_expires_in } = config.jwt;
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const getUser = await User.findById(_id).select('-password');
    if (getUser?.email) {
      const userData = { _id: getUser._id, email: getUser.email };
      res.status(200).json(userData);
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const isExist = await User.findOne({ email });
      if (isExist) {
        const matchPassword = isExist.password === password;
        if (!matchPassword) {
          throw new Error('Invalid password');
        } else {
          const userData = { _id: isExist._id, email: isExist.email };
          const token = jwtHelpers.createJwtToken(
            userData,
            jwt_access_secret!,
            jwt_access_expires_in!
          );
          res.status(200).json({ ...userData, token, success: true });
        }
      } else {
        throw new Error("User dosen't exist");
      }
    } else {
      throw new Error('Email and Password needed ');
    }
  } catch (error) {
    next(error);
  }
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      throw new Error('User already exist');
    } else {
      const user = await User.create({ email, password });
      const userData = { _id: user._id, email: user.email };
      const token = jwtHelpers.createJwtToken(
        userData,
        jwt_access_secret!,
        jwt_access_expires_in!
      );
      res.status(200).json({ ...userData, token, success: true });
    }
  } catch (error) {
    next(error);
  }
};

export const authController = { register, auth, login };
