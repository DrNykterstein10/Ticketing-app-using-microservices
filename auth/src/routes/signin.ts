import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@pr-ticketing-app/lib";
import { PasswordService } from "../services/passwordService";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Enter a valid email"),

    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("No user with this email exists");
    }

    const storedPassword = existingUser.password;
    const checkPassword = await PasswordService.compareHash(
      storedPassword,
      password
    );
    if (!checkPassword) {
      throw new BadRequestError("Invalid password");
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SIGNING_KEY!
    );

    req.session = {
      jwt: jwtToken,
    };

    return res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
