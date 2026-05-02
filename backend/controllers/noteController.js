import Note from "../models/noteSchema.js"

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
      author: req.user._id,
    });
    await newNote.save();
    res.status(200).send("Successful");
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const editNote = async (req, res, next) => {
  try {
    const id = req.params.id
    res.send(id)
  } catch (error) {
    next(error)
  }
}