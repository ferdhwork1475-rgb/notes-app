import Note from "../models/noteSchema.js"

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
    });yu
    console.log(newNote)
    res.status(200).send("Successful")
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll()
    
    
  } catch (error) {
    next(error)
  }
}