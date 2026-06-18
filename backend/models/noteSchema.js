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

// noteSchema.pre("save", async () => {
//   if(this.isModified("content")) {
//     // const words = this.content.split(" ")

//   }
// })

const Note = mongoose.model("Note", noteSchema);
export default Note;
