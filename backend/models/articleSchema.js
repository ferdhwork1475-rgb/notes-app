import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      required: true,
      type: String,
    },
    category: {
      type: String,
      enum: ["Politics", "Technology", "Health", "Sports", "Entertainment", "Business", "Science", "Education", "World", "Other"],
      default: "Other",
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

articleSchema.pre("save", async function () {
  if (this.isModified("content")) {
    const wordsCount = this.content.trim().split(/\s+/).length;
    const avgTime = 250;
    const total = wordsCount / avgTime;
    // Math.ceil enables you get whole numbers 
    this.readingTime = Math.ceil(total)
  }
});

const Article = mongoose.model("Article", articleSchema);
export default Article;