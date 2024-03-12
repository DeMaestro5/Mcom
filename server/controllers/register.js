import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      email,
      name,
      password: hash, // Store the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json(newUser.toJSON({ message: 'User created successfully' }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
