import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'Todo',
      trim: true,
      enum: TAGS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

notesSchema.index({ tag: 1 });

export const Note = model('Note', notesSchema);