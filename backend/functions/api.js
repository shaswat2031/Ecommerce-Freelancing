const serverless = require('serverless-http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
const cartRoutes = require('../routes/cartRoutes');
const uploadRoutes = require('../routes/uploadRoutes');
const inquiryRoutes = require('../routes/inquiryRoutes');
const couponRoutes = require('../routes/couponRoutes');

dotenv.config();

// Connect to database
connectDB();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
// IMPORTANT: Netlify functions are served under /.netlify/functions/api
// We need the router to understand this prefix OR use a router that handles relative paths.
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running...');
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/upload', uploadRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/coupons', couponRoutes);

// Mount the router at the path used by Netlify Functions
app.use('/.netlify/functions/api', router);
// Also mount at /api for local testing compatibility
app.use('/api', router);


// Export for Serverless
module.exports.handler = serverless(app);
