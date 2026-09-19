import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getNotesController = async (req, res, next) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteByIdController = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNoteController = async (req, res, next) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const updateNoteController = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const deleteNoteController = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(204).send();
};