const { Router } = require("express");
const router = Router();
const {
  createSubmitRequest,
  viewRequestsByUsername,
} = require("../controllers/tenantController");

router.get("/view-requests", viewRequestsByUsername);

router.post("/submit-request", createSubmitRequest);

module.exports = {
  tenantRouter: router,
};
