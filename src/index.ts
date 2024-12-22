import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes';

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(
  cors({
    origin: 'http://localhost:3001', // React app's URL
    methods: ['GET', 'POST'],        // Allowed HTTP methods
    allowedHeaders: ['Content-Type'] // Allowed headers
  })
);


// Middleware
app.use(express.json());

// Routes
app.use('/stories', searchRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;