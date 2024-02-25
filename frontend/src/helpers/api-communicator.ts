import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", {
    name,
    username,
    email,
    password,
  });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const addSkill = async (
  username: string,
  name: string,
  level: Number,
  progress: Number
) => {
  const res = await axios.post("/user/skill/" + username + "/add/", {
    name,
    level,
    progress,
  });
  if (res.status !== 201) {
    throw new Error("Unable to add skill");
  }
  const data = await res.data;
  return data;
};

export const modifySkill = async (
  username: string | undefined,
  name: string | undefined,
  level: Number,
  progress: Number
) => {
  const res = await axios.post("/user/skill/" + username + "/modify/", {
    name,
    level,
    progress,
  });
  if (res.status !== 201) {
    throw new Error("Unable to modify Skill");
  }
  const data = await res.data;
  return data;
};

export const getallSkills = async (username: string | undefined) => {
  const res = await axios.get("/user/skill/" + username + "/");
  if (res.status !== 200) {
    throw new Error("Unable to get skills");
  }
  const data = await res.data;
  return data;
};

export const deleteSkill = async (
  username: string | undefined,
  name: string
) => {
  const res = await axios.post("/user/skill/" + username + "/delete/", {
    name,
  });
  if (res.status !== 201) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};
