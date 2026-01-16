const mongoose = require("mongoose");

// Vendor Order Schema - Orders assigned to specific vendors
const vendorOrderSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    // Items from this vendor in the order
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        sku: { type: String },
      },
    ],

    // Vendor-specific order details
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    netAmount: { type: Number, required: true }, // subtotal - commission

    // Status tracking
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },

    // Shipping info
    trackingNumber: { type: String },
    shippingCarrier: { type: String },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    shiprocketOrderId: { type: String },
    shipmentId: { type: String },

    // Customer info (copied for vendor reference)
    shippingAddress: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
      phone: { type: String },
    },

    // Notes
    vendorNotes: { type: String },
    customerNotes: { type: String },

    // Payout
    payoutStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    payoutDate: { type: Date },
    payoutReference: { type: String },

    // Return tracking
    returnStatus: {
      type: String,
      enum: ['None', 'Requested', 'Approved', 'Rejected', 'Returned', 'Refunded', 'Pending', 'Processing', 'Completed'],
      default: 'None'
    },
    returnReason: { type: String },
    returnRequestedAt: { type: Date }
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
vendorOrderSchema.index({ vendor: 1, status: 1 });
vendorOrderSchema.index({ order: 1 });
vendorOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("VendorOrder", vendorOrderSchema);
