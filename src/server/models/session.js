import mongoose, { Schema } from 'mongoose';

const sessions_schema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: { type: String, required: true },
  tokenCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a TTL index on `tokenCreatedAt` to expire documents after 1 hour
sessions_schema.index({ tokenCreatedAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.models.sessions ||
  mongoose.model('sessions', sessions_schema);
