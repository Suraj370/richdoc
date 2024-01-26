const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  access: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      read: {
        type: Boolean,
        default: false,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
