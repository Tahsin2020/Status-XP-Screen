import { Router } from "express";
import userRoutes from "./user-routes.js";
// I have to write my routes here.

const appRouter = Router();

appRouter.use("/user", userRoutes);

export default appRouter;
