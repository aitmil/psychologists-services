import admin from 'firebase-admin';
import * as fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync(
    '../../../../sdk/psychologists-services/serviceAccountKey.json',
    'utf-8'
  )
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://psychologists-services-d60a2-default-rtdb.europe-west1.firebasedatabase.app',
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  process.exit(1);
}

const db = admin.database();

const psychologistsData = JSON.parse(
  fs.readFileSync('./psychologists.json', 'utf-8')
);

async function uploadPsychologists() {
  try {
    const psychologistsRef = db.ref('psychologists');
    await psychologistsRef.set(psychologistsData);
    console.log('Psychologists data uploaded successfully');
  } catch (error) {
    console.error('Error uploading psychologists data:', error);
  }
}

uploadPsychologists();
