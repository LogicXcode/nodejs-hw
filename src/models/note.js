import { Schema, model } from 'mongoose';

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
      default: 'Ideas',
      trim: true,
      enum: [
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', notesSchema);