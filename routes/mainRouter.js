const { Router } = require('express');
const router = Router()
const { getUserRole } = require('../controllers/mainController');

// POST route for login
router.post("/login", getUserRole);

module.exports = {
    mainRouter: router,
  };