import mongoose, { Schema, Document, Model } from 'mongoose';
import {
  ICloudinaryAsset,
  CloudinaryAssetSchema,
} from './common/cloudinaryAsset';

export interface IAbout extends Document {
  title: string;
  description: string;
  // ? is for optional fields and | null allows for null values
  resume?: ICloudinaryAsset | null;
  profilePic?: ICloudinaryAsset | null;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    resume: {
      type: CloudinaryAssetSchema,
      default: null,
    },
    profilePic: {
      type: CloudinaryAssetSchema,
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev mode
const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

export default About;
