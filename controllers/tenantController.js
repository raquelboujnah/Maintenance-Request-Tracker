const { insertRequest, getRequestsByUsername } = require('../models/maintenanceRequests');

// Controller for submitting a new maintenance request
async function createSubmitRequest(req, res) {
  const { address, issueDescription } = req.body;
  const username = req.session.username; // Ensure username is stored in session

  // Check if the user is logged in (username exists in session)
  if (!username) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  // Check for missing required fields
  if (!address || !issueDescription) {
    return res.status(400).json({ message: 'Address and issue description are required' });
  }

  try {
    // Insert request into the database
    const requestId = await insertRequest(username, address, issueDescription);
    const newRequest = { username, address, issue_description: issueDescription, status: 'Pending' };
    res.status(201).json({ message: 'Request submitted successfully', requestId, request: newRequest });
  } catch (error) {
    // Log the error with more specific details
    console.error('Error submitting request:', error);
    res.status(500).json({ message: 'Failed to submit maintenance request due to a server error.' });
  }
}

// Route handler to fetch all requests for a specific username
const viewRequestsByUsername = async (req, res) => {
  const username = req.session.username; // Retrieve the username from session

  // Check if the user is logged in
  if (!username) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  try {
    // Fetch requests for the logged-in user
    const requests = await getRequestsByUsername(username);
    if (requests.length === 0) {
      return res.status(404).json({ message: 'No requests found for this user' }); // Handle no requests found
    }
    // Include the username in the response for easier access on the frontend
    res.json({ username, requests }); // Send the list of requests and username
  } catch (error) {
    // Log the error
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch maintenance requests due to a server error.' });
  }
};

module.exports = {
  createSubmitRequest,
  viewRequestsByUsername
};
