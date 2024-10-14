// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRbmG6EgnQxGBf55oEVK1s4Ah0XMNOqUI',
  authDomain: 'psychologists-services-d60a2.firebaseapp.com',
  projectId: 'psychologists-services-d60a2',
  storageBucket: 'psychologists-services-d60a2.appspot.com',
  messagingSenderId: '649409090701',
  appId: '1:649409090701:web:b72420480d5ae9f8843ec4',
  measurementId: 'G-DNXK57LCPR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
