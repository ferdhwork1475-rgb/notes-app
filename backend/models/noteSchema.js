import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    tags: [{ type: String }],
    thumbnail: {
      required: true,
      type: String,
    },
    readingTime: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.pre("save", async function () {
  if (this.isModified("content")) {
    const wordsCount = this.content.trim().split(/\s+/).length;
    const avgTime = 250;
    const total = wordsCount / avgTime;
    // Math.ceil enables you get whole numbers 
    this.readingTime = Math.ceil(total)
  }
});

const Note = mongoose.model("Note", noteSchema);
export default Note;