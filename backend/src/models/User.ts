import mongoose from "mongoose";

// I have to change what's inside these objects/schemas. I don't think I need chatschema, but I am wondering about skills.

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
