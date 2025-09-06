const express = require('express');
const app = express();

const { db } = require('./firebase-config');
const { collection, doc, setDoc } = require('firebase/firestore');

app.get('/', (req, res) => {
  res.send('Backend with Firebase is working!');
});

app.get('/test', async (req, res) => {
  try {
    const testCollection = collection(db, 'test'); 
    await setDoc(doc(testCollection, 'first'), {
      message: 'Hello from Firebase!',
      timestamp: new Date()
    });
    res.send('Data written to Firebase!');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));