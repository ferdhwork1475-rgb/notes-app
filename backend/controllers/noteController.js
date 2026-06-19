import Note from "../models/noteSchema.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
      thumbnail: req.file ? req.file.filename : null,
    });
    await newNote.save();
    res.status(200)
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

export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { title, content, tags, thumbnail } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note.title = title;
    note.content = content;
    note.tags = tags;
    note.thumbnail = thumbnail;
    // await note.save();
    console.log(note.title, note.content, note.tags, note.thumbnail);
    // res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    await note.deleteOne();
    res.status(200).send("successful");
  } catch (error) {
    next(error);
  }
};
