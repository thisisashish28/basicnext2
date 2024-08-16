import mongoose, { Schema } from 'mongoose';

const PageSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: null },
  userid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
