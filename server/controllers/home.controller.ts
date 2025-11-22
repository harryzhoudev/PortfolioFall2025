import { Request, Response } from 'express';
import Home from '../models/Home';

// GET /api/home
// Public: fetch the homepage content
export const getHome = async (req: Request, res: Response) => {
  try {
    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({
        message: 'Home content not found. Please create it.',
      });
    }

    return res.status(200).json(home);
  } catch (error) {
    console.error('Error fetching home content:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/home
// Admin: create/update the homepage content
export const updateHomeContent = async (req: Request, res: Response) => {
  try {
    const { greetingMessage, mainMessage, subMessage } = req.body;

    // Basic validation
    if (!greetingMessage || !mainMessage || !subMessage) {
      return res.status(400).json({
        message:
          'Greeting Message, Main Message, and Sub-Message are required.',
      });
    }

    const home = await Home.findOneAndUpdate(
      {},
      { greetingMessage, mainMessage, subMessage },
      {
        new: true, // return the updated document
        upsert: true, // create if it doesn't exist
        runValidators: true, // run schema validation set in the model
        setDefaultsOnInsert: true, // apply default values if creating a new document
      }
    );

    return res.status(200).json(home);
  } catch (error) {
    console.error('Error updating home content:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
