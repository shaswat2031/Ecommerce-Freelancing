const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const Order = require('./models/Order');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const fixRefund = async () => {
    await connectDB();

    try {
        // Find the specific order
        const orders = await Order.find({});
        const targetOrder = orders.find(o => o._id.toString().endsWith('725a6aff'));

        if (!targetOrder) {
            console.log("Order ending in 725a6aff not found");
            process.exit(1);
        }

        console.log(`Found Order: ${targetOrder._id}`);
        console.log(`Current Refund Amount: ${targetOrder.refundAmount}`);
        console.log(`Current Status: ${targetOrder.status}`);

        // Update refund amount
        // Calculation: 1299 (Item) + 233.82 (Tax) = 1532.82
        const correctRefundAmount = 1532.82;

        targetOrder.refundAmount = correctRefundAmount;
        targetOrder.isRefunded = true;

        // Ensure status allows it to be counted as "Money Out" if we use status checks, 
        // but simple sum uses refundAmount.

        await targetOrder.save();

        console.log(`Updated Order Refund Amount to: ${targetOrder.refundAmount}`);

    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

fixRefund();
