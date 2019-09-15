const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  name: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
