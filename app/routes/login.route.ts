import { Router } from "express";
import { validate } from "../middlewares/validator";
import { SchemaLogin } from "../lib/definitions/schemas";
import multer from "multer";
import { login } from "../controllers/login.controller";

//instantiate the router
const loginRouter: Router = Router();

//route to login as a user
loginRouter.post("/", multer().none(), validate(SchemaLogin), login);

//export the router
export default loginRouter;
