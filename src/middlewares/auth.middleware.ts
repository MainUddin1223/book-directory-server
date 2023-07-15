import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { jwtHelpers } from '../jwt';
import { User } from '../modules/authModule/auth.model';
export const verifyAuth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      try {
        const decoded = jwtHelpers.verifyToken(
          token,
          config.jwt.jwt_access_secret as string
        );
        req.user = decoded;
        const isUserExist =await User.findById({ _id: req.user._id });
        if (!isUserExist) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };