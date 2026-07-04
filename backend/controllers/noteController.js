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
    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    const articles = notes.map((note) => ({
      "id": note._id,
      "title": note.title,
      "content": note.content,
      "tags": note.tags,
      "thumbnail": note.thumbnail,
      "createdAt": note.createdAt,
      "readingTime": note.readingTime,
    }))
    res.status(200).json(articles);
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
    const { title, content, tags } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    const updatedData = {
      title: title || note.title,
      content: content || note.content,
      tags: tags || note.tags,
      thumbnail: req.file ? req.file.filename : note.thumbnail,
    };

    await Note.findByIdAndUpdate(req.params.id, updatedData, { returnDocument: "after" });

    res.status(200).send("successful");
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
