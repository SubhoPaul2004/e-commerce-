const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Vercel handles env vars automatically, but this keeps local dev working
dotenv.config(); 

const app = express();

app.use(express.json());

// 1. CORS Configuration
app.use(cors({
  origin: true, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Logging Middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// 3. Database Connection (Optimized for Vercel/Serverless)
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is missing in Environment Variables!");
    process.exit(1); 
}

// Optimization: This prevents Mongoose from trying to reconnect constantly in serverless
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGO_URI, {
      dbName: 'test', // EXPLICITLY telling it to use the 'test' DB from your screenshot
      serverSelectionTimeoutMS: 5000, // Fail fast (5s) instead of hanging for 30s
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB Atlas (Database: test)');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

// Execute connection
connectDB();

// 4. API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 5. Root Route
app.get('/', (req, res) => {
  res.send('TECHBazar API is running...');
});

// 6. 404 Handler 
app.use((req, res, next) => {
  console.log(`❌ 404 Error: ${req.method} ${req.originalUrl} - Not Found`);
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found.` 
  });
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});