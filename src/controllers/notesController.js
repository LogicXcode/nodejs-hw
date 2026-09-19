import { Note } from '../models/note.js';
import createHttpError from 'http-errors';


export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found notes!',
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};


export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found note with id ${id}!`,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};


export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};


export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: false, 
      returnDocument: 'after', 
      runValidators: true,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};