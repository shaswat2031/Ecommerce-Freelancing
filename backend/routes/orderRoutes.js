const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        couponCode,
        discountAmount
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        // Handle Coupon Logic
        if (couponCode) {
            const Coupon = require('../models/Coupon');
            const coupon = await Coupon.findOne({ code: couponCode });

            if (!coupon) {
                return res.status(400).json({ message: 'Invalid coupon code' });
            }

            const currentDate = new Date();

            if (!coupon.isActive) {
                return res.status(400).json({ message: 'Coupon is inactive' });
            }

            if (coupon.expiryDate && new Date() > coupon.expiryDate) {
                return res.status(400).json({ message: 'Coupon has expired' });
            }

            if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
                return res.status(400).json({ message: 'Coupon usage limit reached' });
            }

            if (coupon.assignedTo && coupon.assignedTo.toString() !== req.user._id.toString()) {
                return res.status(400).json({ message: 'Coupon not valid for this user' });
            }

            // Apply usage
            coupon.usedCount += 1;
            await coupon.save();
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            couponCode,
            discountAmount
        });

        const createdOrder = await order.save();

        // Emit new order event
        if (req.io) {
            req.io.emit('new-order', createdOrder);
        }

        res.status(201).json(createdOrder);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Get order analytics
// @route   GET /api/orders/analytics
// @access  Private/Admin
router.get('/analytics', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('orderItems.product');
        const Product = require('../models/Product');
        const User = require('../models/User'); // Import User model
        const allProducts = await Product.find({});

        const totalOrders = orders.length;
        const totalUsers = await User.countDocuments({}); // Total registered users

        // Count unique customers (users who have at least one order)
        const uniqueCustomers = new Set(orders.map(o => o.user.toString())).size;

        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

        // Order Status Distribution (for pie chart)
        const ordersByStatus = orders.reduce((acc, order) => {
            const status = order.status || 'Pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Completed vs Pending
        const completedOrders = orders.filter(o => ['Delivered', 'Shipped'].includes(o.status)).length;
        const pendingOrders = orders.filter(o => !['Delivered', 'Shipped', 'Closed', 'Cancelled'].includes(o.status)).length;
        const completedRevenue = orders.filter(o => ['Delivered', 'Shipped'].includes(o.status)).reduce((acc, o) => acc + o.totalPrice, 0);
        const pendingRevenue = orders.filter(o => !['Delivered', 'Shipped', 'Closed', 'Cancelled'].includes(o.status)).reduce((acc, o) => acc + o.totalPrice, 0);

        // Sales by Date (Last 7 days)
        const salesByDate = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: 7 }
        ]);

        // Product Demand Analysis
        const productStats = {};

        // Initialize with all products (0 sales)
        allProducts.forEach(product => {
            productStats[product.name] = {
                name: product.name,
                totalQuantity: 0,
                totalRevenue: 0,
                orderCount: 0
            };
        });

        // Update with order data
        orders.forEach(order => {
            order.orderItems.forEach(item => {
                const productName = item.name;
                if (!productStats[productName]) {
                    // Handle case where product name in order might differ slightly or product deleted but exists in order
                    productStats[productName] = { name: productName, totalQuantity: 0, totalRevenue: 0, orderCount: 0 };
                }
                productStats[productName].totalQuantity += (item.quantity || 0);
                productStats[productName].totalRevenue += (item.price || 0) * (item.quantity || 0);
                productStats[productName].orderCount += 1;
            });
        });

        const productArray = Object.values(productStats);

        // Most demanding products (top 5)
        const mostDemanding = productArray
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 5);

        // Least demanding products (bottom 5)
        const leastDemanding = productArray
            .sort((a, b) => a.totalQuantity - b.totalQuantity)
            .slice(0, 5);

        // Revenue by Product (top 5)
        const topRevenueProducts = productArray
            .sort((a, b) => b.totalRevenue - a.totalRevenue)
            .slice(0, 5);

        // Monthly trend (last 6 months)
        const monthlyTrend = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalSales: { $sum: "$totalPrice" },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } },
            { $limit: 6 }
        ]);

        res.json({
            totalOrders,
            totalRevenue,
            totalUsers,
            uniqueCustomers,
            completedOrders,
            pendingOrders,
            completedRevenue,
            pendingRevenue,
            ordersByStatus,
            salesByDate: salesByDate.reverse(),
            mostDemanding,
            leastDemanding,
            topRevenueProducts,
            monthlyTrend: monthlyTrend.reverse()
        });
    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ message: 'Analytics Failed' });
    }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.status = req.body.status;
        const updatedOrder = await order.save();

        // Emit status update event
        if (req.io) {
            req.io.emit('order-status-updated', updatedOrder);
        }

        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Track order by ID (Public/Protected via ID knowledge)
// @route   GET /api/orders/track/:id
// @access  Public
router.get('/track/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).select('status totalPrice orderItems createdAt isDelivered deliveredAt');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Order not found (Invalid ID)' });
    }
});

module.exports = router;
