const db = require("../config/db"); // Import Knex configuration

// Get all requests
async function getAllRequests() {
  try {
    const data = await db("maintenance_requests").select("*");
    console.log("All Requests:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    throw new Error('Failed to fetch all requests');  // Provide a more descriptive error
  }
}

// Get requests by username
async function getRequestsByUsername(username) {
  console.log("Made it to the model")
  try {
    const data = await db("maintenance_requests")
      .where("username", username)
      .select("*");
    console.log(`Requests for ${username}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching requests for username ${username}:`, error);
    throw new Error(`Failed to fetch requests for username ${username}`);  // Descriptive error
  }
}

// Create a new request
async function insertRequest(username, address, issueDescription) {
  try {
    const [newRequest] = await db("maintenance_requests").insert(
      {
        username,
        address,
        issue_description: issueDescription,
      },
      ["id", "username", "address", "issue_description"]  // Return more information for context
    );
    console.log("New Request Created with ID:", newRequest.id);
    return newRequest.id;  // Return the new request ID
  } catch (error) {
    console.error("Error creating new request:", error);
    throw new Error('Failed to create new request in maintenance_requests table');  // Descriptive error
  }
}

// Update a request
async function updateRequest(requestId, status) {
  try {
    // Update the request status
    const updateResult = await db('maintenance_requests')
      .where('id', requestId)
      .update({ status });

    if (updateResult === 0) {
      throw new Error(`Request with ID ${requestId} not found`);  // Provide a clear error message
    }

    console.log(`Request ${requestId} updated successfully.`);
    return true; // Return true for successful update
  } catch (error) {
    console.error("Error updating request:", error);
    throw new Error('Failed to update request');  // Descriptive error
  }
}

module.exports = {
  getAllRequests,
  getRequestsByUsername,
  insertRequest,
  updateRequest
};
