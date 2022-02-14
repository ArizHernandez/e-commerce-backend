import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import User from 'models/user';

const tokenSecret = process.env.TOKEN_SECRET;
export default class AuthController {
  public login(req: Request, res: Response) {
    res.json({
      message: 'Hello World',
    });
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRole = req.body?.role || 'user';
      
      // Validate if token exists and if the user exists
      if (!tokenSecret) {
        return res.status(400).json({
          message: 'Error in token secret',
          error: 'Token secret is not defined',
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: 'User already exists',
          error: 'User already exists',
        });
      }

      // create a new user and save it to the database
      const newUser = new User({
        role: userRole,
        password: hashedPassword,
        firstName,
        lastName,
        email,
      });

      await newUser.save();

      // Generate a token with user id and secret
      const token = jwt.sign(
        {
          userId: newUser._id,
        },
        tokenSecret,
        {
          expiresIn: '1h',
        }
      );

      res.status(201).json({
        token,
        message: 'User Created!',
      });
    } catch (error: any) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

      next(error);
    }
  }
}
