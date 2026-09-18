import Note from '../models/note.js';

// Отримати всі нотатки
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отримати нотатку за ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Нотатку не знайдено' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Створити нову нотатку
export const createNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Нотатку не знайдено' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Нотатку не знайдено' });
    }
    res.status(200).json({ message: 'Нотатку успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


