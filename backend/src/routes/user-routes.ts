import { Router } from "express";
import {
  Login,
  Logout,
  Signup,
  Verify,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
import skillRoutes from "./skill-routes.js";
const userRoutes = Router();

userRoutes.use("/skill", skillRoutes);

userRoutes.post("/signup", validate(signupValidator), Signup);
userRoutes.post("/login", validate(loginValidator), Login);
userRoutes.get("/auth-status", verifyToken, Verify);
userRoutes.get("/logout", verifyToken, Logout);

export default userRoutes;
