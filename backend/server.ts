import express from 'express';
import router from './src/routes/PropertyRoute';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));