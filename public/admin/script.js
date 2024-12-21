const requestsTableBody = document.getElementById("requests-table-body");
const updateSection = document.getElementById("update-section");
const updateForm = document.getElementById("update-request-form");
const cancelUpdateButton = document.getElementById("cancel-update");
const requestIdInput = document.getElementById("request-id");
const requestIssueSpan = document.getElementById("request-issue");

// Fetch and display all requests
async function loadRequests() {
  console.log("Here")
  try {
    const response = await fetch("/admin/view-requests");
    const requests = await response.json();
    // Populate the table
    requestsTableBody.innerHTML = "";
    requests.forEach((request) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${request.id}</td>
        <td>${request.username}</td>
        <td>${request.address}</td>
        <td>${request.issue_description}</td>
        <td>${request.status}</td>
        <td>
          <button onclick="openUpdateForm(${request.id}, '${request.status}')">Update</button>
        </td>
      `;

      requestsTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading requests:", error);
  }
}

// Open the update form for a specific request
function openUpdateForm(requestId, currentStatus) {
  updateSection.style.display = "block";
  requestIdInput.value = requestId;
  requestIssueSpan.textContent = requestId;
  document.getElementById("status").value = currentStatus;
}

// Close the update form
cancelUpdateButton.addEventListener("click", () => {
  updateSection.style.display = "none";
  updateForm.reset();
});

// Handle the form submission
updateForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const requestId = requestIdInput.value;
  const status = document.getElementById("status").value;

  try {
    const response = await fetch(`/admin/update-request/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update the request.");
    }

    alert("Request updated successfully!");
    updateSection.style.display = "none";
    updateForm.reset();
    loadRequests(); // Reload requests after the update
  } catch (error) {
    console.error("Error updating request:", error);
    alert(`Error: ${error.message}`);
  }
});

// Load all requests on page load
loadRequests();