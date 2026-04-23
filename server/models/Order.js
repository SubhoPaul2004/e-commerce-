const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: String, required: true } 
        }
    ],
    shippingAddress: {
        address: { type: String, default: '' },
        city: { type: String, default: '' },    
        postalCode: { type: String, default: '' }, 
        country: { type: String, default: '' }, 
    },
    totalPrice: { 
        type: Number, 
        required: true, 
        default: 0.0 
    },
    status: { 
        type: String, 
        required: true, 
        default: 'Pending' 
    },
    deliveredAt: {
        type: Date
    }
}, { timestamps: true });

// This prevents the "Cannot overwrite model once compiled" error
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;