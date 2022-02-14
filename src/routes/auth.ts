import { Router } from 'express';
import Joi from 'joi';

import AuthController from 'controllers/auth';
import JoiValidate from 'middlewares/JoiValidate';

const router = Router();
const authController = new AuthController();

const validateRoutes = {
  signup: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

router.post(
  '/signup',
  JoiValidate(validateRoutes.signup, 'body'),
  authController.signup
);

export default router;
