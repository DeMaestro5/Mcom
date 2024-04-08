import express from 'express';
import multer from 'multer';
import { updateProfilePicture } from '../controllers/updateProfilePicture.js';

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  },
});

// Set up multer middleware
const upload = multer({ storage });

// Route for updating profile picture
router.post('/', upload.single('profilePicture'), updateProfilePicture);

export { router as ProfilePictureRoutes };
