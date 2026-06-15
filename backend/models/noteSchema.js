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
    tags: [{ type: String }],
    thumbnail: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
