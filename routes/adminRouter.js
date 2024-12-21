const { Router } = require('express');
const router = Router()
const { viewRequests, updateRequestItem } = require('../controllers/adminController');

router.get('/view-requests', viewRequests);

router.put('/update-request/:requestId', updateRequestItem );

module.exports = {
    adminRouter: router,
  };