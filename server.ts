import express from 'express';
import propertyRouter from './src/routes/PropertyRoute';
import cors from 'cors';
import userRouter from './src/routes/UserRoute';

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

app.use(propertyRouter);
app.use(userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));