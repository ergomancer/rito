import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";

//instantiate the router
const profileRouter: Router = Router();

//route to fetch user by username
profileRouter.get("/:username", getProfile);

//export the router
export default profileRouter;
