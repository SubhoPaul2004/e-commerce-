const express = require('express');
const router = express.Router();
const { 
  getOrders, 
  updateOrderToDelivered, 
  addOrderItems 
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// This matches: GET /api/orders
router.get('/', protect, admin, getOrders);

// This matches: POST /api/orders
router.post('/', protect, addOrderItems);

// This matches: PUT /api/orders/:id/deliver
// IMPORTANT: Ensure there is a colon before 'id'
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;