import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  const query = { userId: req.user._id };

  if (tag) {
    query.tag = tag;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search,$options: 'i' } },
      { content: { $regex: search,$options: 'i' } },
    ];
  }

  const [notes, totalItems] = await Promise.all([
    Note.find(query).skip(skip).limit(Number(perPage)),
    Note.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found notes!',
    data: {
      notes,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId, userId: req.user._id });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found note with id ${noteId}!`,
    data: note,
  });
};

export const createNote = async (req, res, next) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a note!',
    data: note,
  });
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    { returnDocument: 'after', runValidators: true },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a note!',
    data: note,
  });
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted a note!',
    data: note,
  });
};