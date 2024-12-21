const { getUserByUsername } = require('../models/userRoles'); 
const bcrypt = require('bcrypt')

async function getUserRole(req, res) {
    const { username, password } = req.body;
    
    try {
      // Fetch the user from the database using the provided username
      const user = await getUserByUsername(username);
      
      // Check if the user exists
      if (!user) {
        return res.status(400).send("User not found");
      }
  
      // Compare the password (assumes password is hashed in the database)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
      }
      
      // Store the username in the session
      req.session.username = username;
  
      // Redirect to the appropriate dashboard based on the user's role
      if (user.role === "Admin") {
        return res.redirect("/admin"); // Redirect to admin dashboard
      } else if (user.role === "Tenant") {
        return res.redirect("/tenant"); // Redirect to tenant dashboard
      } else {
        return res.status(400).send("Invalid role");
      }
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  module.exports = {
    getUserRole
  }
  