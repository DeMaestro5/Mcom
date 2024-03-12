import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ name: name.toLowerCase() });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }

    // Compare the provided password with the hashed password stored in the database

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { name: user.name, id: user._id },
        'jwt-secret-key',
        {
          expiresIn: '1d',
        }
      );
      res.cookie('token', token);
      // If username and password are correct, respond with success message
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // If password is incorrect, respond with an error message
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // If there's an error, respond with an error message
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
