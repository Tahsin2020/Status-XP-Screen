import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";
import PrivateProfile from "../models/PrivateProfile.js";
import PublicProfile from "../models/PublicProfile.js";
import nodemailer from "nodemailer";

export const getAllPrivateProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all privateprofiles
    const privateprofiles = await PrivateProfile.find();
    return res.status(200).json({ message: "OK", privateprofiles });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const privateprofileSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // I have to retrieve stuff from the body to put into sign up (like what skills do they want, location etc.)
  try {
    //privateprofile signup
    const { username, email, password } = req.body;
    const existingPrivateProfile = await PrivateProfile.findOne({ email });
    if (existingPrivateProfile)
      return res.status(401).send("private profile already registered");

    const hashedPassword = await hash(password, 10);
    const privateprofile = new PrivateProfile({
      username: username,
      email,
      password: hashedPassword,
    });
    await privateprofile.save();

    const publicprofile = new PublicProfile({ username: username });
    await publicprofile.save();

    // create token and store cookie.

    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(
      privateprofile._id.toString(),
      privateprofile.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // change domain to the proper frontend.
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "OK",
      username: privateprofile.username,
      email: privateprofile.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const privateprofileLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //privateprofile login
    const { email, password } = req.body;
    const privateprofile = await PrivateProfile.findOne({ email });
    if (!privateprofile) {
      return res.status(401).send("PrivateProfile not registered");
    }
    const isPasswordCorrect = await compare(password, privateprofile.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(
      privateprofile._id.toString(),
      privateprofile.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // change domain to the proper frontend.
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
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

export const verifyPrivateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //privateprofile token check
    const privateprofile = await PrivateProfile.findById(res.locals.jwtData.id);
    if (!privateprofile) {
      return res
        .status(401)
        .send("PrivateProfile not registered OR Token malfunctioned");
    }
    if (privateprofile._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
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

export const privateprofileLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //privateprofile token check
    const privateprofile = await PrivateProfile.findById(res.locals.jwtData.id);
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

export const ResetPasswordRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const privateprofile = await PrivateProfile.findOne({ email });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "yourpassword",
    },
  });
  var mailOptions = {
    from: "youremail@gmail.com",
    to: "myfriend@yahoo.com",
    subject: "Sending Email using Node.js",
    html: "<h1>Welcome</h1><p>That was easy!</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  //Link - {path} + privateprofile.password -> I can encrypt this some more.

  // Send to user in email along with dialog explaining usage.
};
