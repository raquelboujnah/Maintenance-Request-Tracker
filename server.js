const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');  // Import express-session
const cors = require("cors")

const port = 3000;

const { tenantRouter } = require("./routes/tenantRouter");
const { adminRouter } = require("./routes/adminRouter");
const { mainRouter } = require("./routes/mainRouter")

//Middleware
app.use(express.urlencoded({ extended: true })); //Converts the encoded form data into a JavaScript object, which you can then access via req.body
app.use(express.json());
app.use(session({
  secret: 'your-secret-key', // Secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));
app.use(cors()); 

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/", mainRouter);
app.use("/tenant", tenantRouter)
app.use("/admin", adminRouter);

// Serve the login page at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
