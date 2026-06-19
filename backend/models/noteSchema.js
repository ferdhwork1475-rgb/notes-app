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

noteSchema.pre("save", async function (next) {
  if (this.isModified("content")) {
    const wordsCount = this.content.trim().split(/\s+/).length;
    const avgTime = 250;
    const total = wordsCount / avgTime;
    // Math.ceil enables you get whole numbers 
    this.readingTime = Math.ceil(total)
  }

  next();
});

const Note = mongoose.model("Note", noteSchema);
export default Note;