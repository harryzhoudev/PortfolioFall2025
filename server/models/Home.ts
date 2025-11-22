import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHome extends Document {
  greetingMessage: string;
  mainMessage: string;
  subMessage: string;
}

const HomeSchema = new Schema<IHome>(
  {
    greetingMessage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    mainMessage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    subMessage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev mode
const Home: Model<IHome> =
  mongoose.models.Home || mongoose.model<IHome>('Home', HomeSchema);

export default Home;
