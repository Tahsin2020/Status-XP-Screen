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
skillRoutes.post("/:username/modify/bio", verifyToken, modifySkill);
skillRoutes.post("/:username/modify/education", verifyToken, addSkill);
skillRoutes.post("/:username/modify/experience", verifyToken, deleteSkill);

export default skillRoutes;
