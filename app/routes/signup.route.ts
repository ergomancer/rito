import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validator";
import { SchemaUserCreate } from "../lib/definitions/schemas";
import multer from "multer";

//instantiate the router
const signupRouter: Router = Router();

//route to create a new user
signupRouter.post(
  "/",
  multer().none(),
  validate(SchemaUserCreate),
  createUser,
);

//export the router
export default signupRouter;
