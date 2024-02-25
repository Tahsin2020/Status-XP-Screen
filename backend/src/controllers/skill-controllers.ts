import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";
import User from "../models/User.js";

export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    //get all privateprofiles
    const user = await User.findOne({ username });
    return res.status(200).json({ message: "OK", skills: user.skills });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const addSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // I have to retrieve stuff from the body to put into sign up (like what skills do they want, location etc.)
  try {
    const { username } = req.params;
    const { name, level, progress } = req.body;
    //privateprofile signup
    const user = await User.findOne({ username });

    user.skills.push({ name, level, progress });
    await user.save();

    return res.status(201).json({
      message: "OK",
      skills: user.skills,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const { name } = req.body;
    //privateprofile signup
    const user = await User.findOne({ username });

    user.skills.remove({ name });
    await user.save();

    return res.status(201).json({
      message: "OK",
      skills: user.skills,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const modifySkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const { name, level, progress } = req.body;
    //privateprofile signup
    const user = await User.findOne({ username });

    var num_of_skills = user.skills.length;

    for (let i = 0; i < num_of_skills; i++) {
      var item = user.skills[i];
      if (item.name == name) {
        item.level = level;
        item.progress = progress;
      }
    }

    await user.save();

    return res.status(201).json({
      message: "OK",
      skills: user.skills,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
