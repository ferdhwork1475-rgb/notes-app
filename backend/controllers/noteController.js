import Note from "../models/noteSchema.js"

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
    });
    console.log(newNote)
    res.status(200).send("Successful")
  } catch (error) {
    // next(error);
    console.log(error)
  }
};
