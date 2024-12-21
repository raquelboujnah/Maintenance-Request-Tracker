const usernameSpan = document.getElementById("username");
const greeting = document.getElementById("greeting");
const submitForm = document.querySelector("form");
const requestsList = document.getElementById("requests-list");

async function fetchUserRequests() {
  try {
    // Fetch the logged-in user's requests
    const response = await fetch("/tenant/view-requests")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Set the greeting with the user's name
    usernameSpan.textContent = data.username;

    // Dynamically create list of requests
    requestsList.innerHTML = ""; // Clear any existing list items
    data.requests.forEach((request) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Address: ${request.address}, Issue: ${request.issue_description}, Status: ${request.status}`;
      requestsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    alert("Error loading your maintenance requests.");
  }
}

async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const address = document.getElementById("address").value;
  const issueDescription = document.getElementById("issueDescription").value;

  const requestData = {
    address,
    issueDescription,
  };

  try {
    const response = await fetch("/tenant/submit-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit request");
    }

    const newRequest = await response.json(); // Get the newly created request
    const listItem = document.createElement("li");
    listItem.textContent = `Address: ${newRequest.request.address}, Issue: ${newRequest.request.issue_description}, Status: ${newRequest.request.status}`;
    requestsList.appendChild(listItem); // Add the new request to the list
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("Error submitting maintenance request.");
  }
}

// Initialize the page by fetching requests
fetchUserRequests();

// Attach event listener to the form for handling submission
submitForm.addEventListener("submit", handleFormSubmit);
