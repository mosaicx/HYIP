const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  fullname: String,
  introduction: String,
  avatar: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  amount: Number,
  role: String, // 1, khach hang 0-admin,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
