import express from 'express';
import router from './src/routes/PropertyRoute';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "https://real-estate-2-dun.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

app.use(router);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Local server running on port 3000"));
}

export default app;
