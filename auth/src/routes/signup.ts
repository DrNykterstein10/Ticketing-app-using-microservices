import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email"),

    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new BadRequestError('User with this email already exists');
    }

    const user = User.build({email, password});
    await user.save();

    return res.status(201).send(user);
    
  }
);

export { router as signUpRouter };
