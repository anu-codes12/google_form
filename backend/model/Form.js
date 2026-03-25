import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    questions: [
      {
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['short_answer', 'paragraph', 'multiple_choice', 'checkboxes', 'dropdown'],
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        required: {
          type: Boolean,
          default: false,
        },
        options: [
          {
            id: String,
            text: String,
          },
        ],
      },
    ],
    createdBy: {
      type: String,
      default: 'anonymous',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Form', formSchema);
