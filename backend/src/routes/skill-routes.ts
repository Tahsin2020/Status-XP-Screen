import { Router } from "express";
import {
  getSkills,
  modifySkill,
  addSkill,
  deleteSkill,
} from "../controllers/skill-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
const skillRoutes = Router();

skillRoutes.get("/:username/", verifyToken, getSkills);
skillRoutes.post("/:username/modify/", verifyToken, modifySkill);
skillRoutes.post("/:username/add/", verifyToken, addSkill);
skillRoutes.post("/:username/delete/", verifyToken, deleteSkill);

export default skillRoutes;
