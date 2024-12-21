const { Router } = require('express');
const router = Router()
const { viewRequests, updateRequestItem } = require('../controllers/adminController');

// Route to view maintenance requests with filtering options (e.g., by status)
router.get('/view-requests', viewRequests);

  // Route to update the status of a maintenance request
router.put('/update-request/:requestId', updateRequestItem );

module.exports = {
    adminRouter: router,
  };