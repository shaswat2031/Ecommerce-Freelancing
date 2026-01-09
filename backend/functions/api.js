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

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://rad-kringle-188297.netlify.app',
    process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        // Check if origin is allowed
        const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.some(o => origin.startsWith(o));

        if (isAllowed) {
            callback(null, true);
        } else {
            // Fallback for development/testing ease
            console.log('CORS looser check for:', origin);
            callback(null, true);
        }
    },
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

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
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
