const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();


app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// 3. Database Connection
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is missing!");
    process.exit(1); 
}
mongoose.connection.models = {}; 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Error:', err.message));

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
    message: `Route ${req.originalUrl} not found. Check orderRoutes.js!` 
  });
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});