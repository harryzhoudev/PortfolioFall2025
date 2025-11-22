import { Schema } from 'mongoose';

export interface ICloudinaryAsset {
  publicId: string;
  url: string;
  downloadUrl?: string;
}

export const CloudinaryAssetSchema = new Schema<ICloudinaryAsset>(
  {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    downloadUrl: { type: String },
  },
  //removes _id field when storing cloudinary asseet as subdocument so it would be more like:
  // {
  //   "title": "About me",
  //   "profilePic": {
  //     "publicId": "portfolio/about/profile_pic_123",
  //     "url": "https://res.cloudinary.com/..."
  //   }
  // }
  // INSTEAD OF:
  // {
  //   "title": "About me",
  //   "profilePic": {
  //     "_id": "6740d9f3e2d1b2f4c1234567", <--------------------------------
  //     "publicId": "portfolio/about/profile_pic_123",
  //     "url": "https://res.cloudinary.com/..."
  //   }
  // }

  { _id: false }
);
