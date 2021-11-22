import express, { Request, Response } from "express";

import { currentUser } from "@pr-ticketing-app/lib";

const router = express.Router();

router.get(
  "/api/users/currentUser",
  currentUser,
  (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
