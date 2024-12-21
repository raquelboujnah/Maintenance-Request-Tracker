const express = require('express');
const router = express.Router();
const maintenanceRequests = []

// Route to display the form for submitting a maintenance request
router.get('/submit-request', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/submit-request.html'));
  });
  
// Route to handle the form submission and store the request
router.post('/submit-request', (req, res) => {
  const { name, address, issueDescription } = req.body;

  // Validate inputs
  if (!name || !address || !issueDescription) {
    return res.status(400).send('All fields are required.');
  }

  // Store the request
  const request = {
    id: maintenanceRequests.length + 1,
    name,
    address,
    issueDescription,
    status: 'Pending', // Initial status
  };

  maintenanceRequests.push(request);

  // Respond with a success message
  res.status(200).send('Your maintenance request has been submitted.');
});

// Route to view the list of maintenance requests (for the logged-in tenant)
router.get('/view-requests', (req, res) => {
  res.json(maintenanceRequests);
});