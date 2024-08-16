import mongoose from 'mongoose';
import { BlockTypes } from '../utils';

const BlocksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  order: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: BlockTypes,
    default: BlockTypes.CONTENT,
  },
});

export default mongoose.models.Blocks || mongoose.model('Blocks', BlocksSchema);
