const { getAllRequests, updateRequest } = require('../models/maintenanceRequests'); 

// Controller to view all requests, with optional filters
const viewRequests = async (req, res) => {
  try {
    // Fetch all requests asynchronously
    const requests = await getAllRequests();

    // Get filter criteria from query parameters
    const { status, address } = req.query;

    let filteredRequests = requests;

    // Filter by status if provided
    if (status) {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === status
      );
    }

    // Filter by address if provided
    if (address) {
      filteredRequests = filteredRequests.filter(
        (request) => request.address === address
      );
    }

    // Send the filtered requests as a JSON response
    res.json(filteredRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch maintenance requests.' });
  }
};

const updateRequestItem = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  // Validate that status is provided
  if (!status) {
    return res.status(400).send("Status is required.");
  }

  try {
    // Update the request's status
    const result = await updateRequest(requestId, status );

    if (result === 0) {
      return res.status(404).send("Request not found.");
    }

    // Send success response
    res.status(200).send("Request status updated");
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).send("Failed to update request.");
  }
};

module.exports = {
  viewRequests,
  updateRequestItem,
};