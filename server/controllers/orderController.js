const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, // <--- Make sure this is being destructured
    totalPrice 
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress, // <--- Make sure this is being saved
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

const getOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({}).populate('user', 'id name email address'); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- THE WISE UPDATE ---
const updateOrderToDelivered = async (req, res) => {
  try {
    // 1. Log the attempt so we see it in VS Code
    console.log("Processing Delivery for Order ID:", req.params.id);

    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = 'Delivered';
      order.deliveredAt = Date.now(); // Record time of delivery

      const updatedOrder = await order.save();
      
      console.log("✅ Order updated successfully in Database");
      res.status(200).json(updatedOrder);
    } else {
      console.log("❌ Order ID not found in MongoDB");
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error("🔥 Controller Crash:", error.message);
    res.status(500).json({ message: "Backend Error: " + error.message });
  }
};

module.exports = { 
  addOrderItems, 
  getOrders, 
  updateOrderToDelivered  
};