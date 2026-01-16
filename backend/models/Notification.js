const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'recipientModel'
    },
    recipientModel: {
        type: String,
        required: true,
        enum: ['User', 'Vendor']
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error'],
        default: 'info'
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String }, // Optional link to redirect
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
