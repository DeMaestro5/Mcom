import fs from 'fs';
import path from 'path';

// Function to update profile picture
export const updateProfilePicture = (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Process the uploaded file
    const tempPath = req.file.path;
    const fileExtension = path.extname(req.file.originalname); // Get file extension
    const fileName = `profile_${Date.now()}${fileExtension}`; // Generate unique file name
    const directoryPath = 'uploads/'; // Specify the directory path where files will be saved
    const targetPath = path.join(directoryPath, fileName);

    // Move the uploaded file to a permanent location with the generated unique file name
    fs.renameSync(tempPath, targetPath);

    // File moved successfully, respond with success message and file details
    return res.status(200).json({
      message: 'Profile picture uploaded successfully.',
      fileName: fileName, // Sending back the generated file name for reference
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ error: 'Error uploading profile picture.' });
  }
};
