import React, { useState } from 'react';
import { imageDB } from './config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const FirebaseImageUpload = ({ onImageUpload }) => {
  const [img, setImg] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleUpload = async () => {
    if (img !== null) {
      const imgRef = ref(imageDB, `files/${v4()}`);
      await uploadBytes(imgRef, img);

      const downloadURL = await getDownloadURL(imgRef);
      onImageUpload(downloadURL);

      // Reset the state after upload
      setImg(null);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default FirebaseImageUpload;
