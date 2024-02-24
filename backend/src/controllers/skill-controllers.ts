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

    var skill_index = user.skills.findIndex(name);
    await user.save();

    return res.status(201).json({
      message: "OK",
      skill_index: skill_index,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //privateprofile token check
    const privateprofile = await User.findById(res.locals.jwtData.id);
    if (!privateprofile) {
      return res
        .status(401)
        .send("PrivateProfile not registered OR Token malfunctioned");
    }
    if (privateprofile._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res.status(200).json({
      message: "OK",
      username: privateprofile.username,
      email: privateprofile.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
