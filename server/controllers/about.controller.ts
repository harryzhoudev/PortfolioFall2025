import { Request, Response } from 'express';
import fs from 'fs';
import About from '../models/About';
import cloudinary from '../config/cloudinary';
import path from 'path';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// GET /api/about
export const getAbout = async (req: Request, res: Response) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }

    return res.json(about);
  } catch (err) {
    console.error('GET /api/about error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/about UPSERT(create if it doesn't exist and update if it does)
export const upsertAbout = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    let about = await About.findOne();

    if (!about) {
      // Create new document
      about = new About({
        title: 'About me',
        description: 'A short bio about me',
      });
    } else {
      // Update existing fields only if provided
      if (typeof title === 'string') about.title = title;
      if (typeof description === 'string') about.description = description;
    }

    await about.save();
    return res.json(about);
  } catch (err) {
    console.error('PUT /api/about error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/about/profile-pic
 * Update the profile picture using an uploaded file (image).
 * Expects multipart/form-data with a single file field (e.g., "file").
 */
export const updateProfilePic = async (req: MulterRequest, res: Response) => {
  console.log('HIT /api/about/profile-pic');
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure the About doc exists
    let about = await About.findOne();
    if (!about) {
      about = new About({
        title: 'About me',
        description: 'A short bio about me',
      });
    }

    // If there was a previous profilePic, delete it from Cloudinary
    if (about.profilePic?.publicId) {
      try {
        await cloudinary.uploader.destroy(about.profilePic.publicId, {
          resource_type: 'image',
        });
      } catch (destroyErr) {
        console.warn('Cloudinary destroy (old profilePic) failed:', destroyErr);
      }
    }

    // Upload new profile picture to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'portfolio/about/profilePic',
      resource_type: 'image', // images bucket
    });

    about.profilePic = {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    };

    await about.save();

    // Remove temp file from disk AFTER successful upload + save
    try {
      await fs.promises.unlink(file.path);
    } catch (unlinkErr) {
      console.warn('Failed to delete temp profilePic file:', unlinkErr);
    }

    return res.json({
      message: 'Profile picture updated',
      about,
    });
  } catch (err) {
    console.error('PUT /api/about/profile-pic error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/about/resume
 * Update the resume using an uploaded file (PDF, DOCX, etc.).
 * Expects multipart/form-data with a single file field (e.g., "file").
 */
export const updateResume = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure the About doc exists
    let about = await About.findOne();
    if (!about) {
      about = new About({
        title: 'About me',
        description: 'A short bio about me',
      });
    }

    // If there was a previous resume, delete it from Cloudinary
    if (about.resume?.publicId) {
      try {
        await cloudinary.uploader.destroy(about.resume.publicId, {
          resource_type: 'raw',
        });
      } catch (destroyErr) {
        console.warn('Cloudinary destroy (old resume) failed:', destroyErr);
      }
    }

    // Grab original filename from Multer
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);

    const cleanBase = baseName.replace(/\s+/g, '_');

    // Upload new resume to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      //this folder is referring to where the file will be stored on cloudinary, not the server
      folder: 'portfolio/about/resume',
      // resource_type: 'image' → image assets (image bucket)
      // resource_type: 'video' → video assets (video bucket)
      // resource_type: 'raw' → generic files (PDF, DOC, ZIP, etc.) (file bucket)
      resource_type: 'raw',
      public_id: `${cleanBase}${ext}`,
      unique_filename: false, // keep exactly the original name
      overwrite: true,
    });

    // Generate a special download URL with a nice filename
    // const downloadUrl = cloudinary.url(uploadResult.public_id, {
    //   resource_type: 'raw',
    //   flags: 'attachment',
    //   filename: 'HarryZhouResume',
    // });

    about.resume = {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    };

    await about.save();

    // Remove temp file from disk AFTER successful upload + save
    try {
      await fs.promises.unlink(file.path);
    } catch (unlinkErr) {
      console.warn('Failed to delete temp resume file:', unlinkErr);
    }

    return res.json({
      message: 'Resume updated',
      about,
    });
  } catch (err) {
    console.error('PUT /api/about/resume error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
