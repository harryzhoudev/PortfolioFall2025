import User from '../models/User';
import jwt from 'jsonwebtoken';

type user = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const generateToken = (user: user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
