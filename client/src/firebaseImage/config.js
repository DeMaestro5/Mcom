import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9x0bqHSj840-S4mN52km513-PFgNcxhA',
  authDomain: 'mcom-profile-images-db.firebaseapp.com',
  projectId: 'mcom-profile-images-db',
  storageBucket: 'mcom-profile-images-db.appspot.com',
  messagingSenderId: '537478593147',
  appId: '1:537478593147:web:2275f28018120f5eb280de',
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
