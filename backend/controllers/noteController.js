import Note from "../models/noteSchema.js";

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
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, content, tags } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note.title = title;
    note.content = content;
    note.tags = tags;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, content, tags } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    await note.deleteOne();
    res.status(200).send("successful");
  } catch (error) {
    next(error);
  }
};
