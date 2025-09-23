import express from 'express';
import PropertyRoutes from './src/routes/PropertyRoutes';

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// Use property routes
app.use(PropertyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));