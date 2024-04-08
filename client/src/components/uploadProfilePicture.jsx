import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    console.log('fjhjd');
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    // Create FormData object to send the file to the server
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      //   Send POST request to upload the file
      const response = await axios.post(
        'http://localhost:4001/updatePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Handle error
    }
  };

  return (
    <input id='profilePictureInput' type='file' onChange={handleFileChange} />
  );
};

export default ProfilePictureUpload;
