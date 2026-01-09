const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fullDescription: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: '₹' },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    features: [String],
    ingredients: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
