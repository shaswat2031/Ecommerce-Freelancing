const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Coupon = require('./models/Coupon');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const hash = async (pwd) => await bcrypt.hash(pwd, salt);

        // We MUST create an admin user to be able to access the system
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: await hash('admin123'),
            isAdmin: true
        });
        console.log(`Created Admin: ${adminUser.email}`);

        // Mock Normal User REMOVED as requested
        // Mock Coupons REMOVED as requested

        console.log('Users Imported!');

        // Create Products
        const sampleProducts = products.map(product => {
            return { ...product };
        });

        await Product.insertMany(sampleProducts);

        console.log('Products Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
