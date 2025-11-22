import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MONGO_URI is missing in .env file');
    process.exit(1);
  }

  try {
    const con = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${con.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
