import mongoose from 'mongoose';

/**
 * Placeholder model — ready for future features like saving analysis history.
 * Not used in the current MVP, but demonstrates the models pattern.
 */
const analysisSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    language: { type: String, required: true },
    mode: { type: String, enum: ['explain', 'debug', 'optimize'], required: true },
    result: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Analysis', analysisSchema);
