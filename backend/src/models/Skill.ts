import mongoose from "mongoose";

// I have to change what's inside these objects/schemas. I don't think I need chatschema, but I am wondering about skills.

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
  },
  progress: {
    type: Number,
  },
});

export default SkillSchema;
