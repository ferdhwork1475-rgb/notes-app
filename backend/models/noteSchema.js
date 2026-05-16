import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      maxLength: 100,
    },
    content: {
      required: true,
      type: String,
    },
    tags:[{ type: String }],
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", noteSchema);
export default Note;