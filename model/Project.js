const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  title: String,
  address: String,
  status: String,
  type: String,
  introduct: String,
  description: String,
  utilities: String,
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Project", ProjectSchema);
