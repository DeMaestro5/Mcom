import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // If email and password are correct, generate a JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id },
        'jwt-secret-key',
        {
          expiresIn: '1d',
        }
      );

      // Set the token in a cookie
      res.cookie('token', token);

      // Respond with success message and user data
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // If password is incorrect, respond with an error message
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // If there's an error, respond with an error message
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
