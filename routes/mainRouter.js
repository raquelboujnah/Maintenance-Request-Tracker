const { Router } = require('express');
const router = Router()
const { getUserRole } = require('../controllers/mainController');

router.post("/login", getUserRole);

module.exports = {
    mainRouter: router,
  };