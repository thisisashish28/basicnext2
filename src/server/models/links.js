import mongoose from 'mongoose';

const LinksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: Array, required: true },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Links || mongoose.model('Links', LinksSchema);
