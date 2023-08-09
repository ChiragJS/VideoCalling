const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./db/index");
const app = express();
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/users", { dbName: 'users' });
// Middleware
app.use(express.json());
app.use(cors());

// HTTP API routes
app.post('/login', async (req, res) => {
  const { email, password } = req.headers;
    console.log("control reaches here");
  const user = await User.findOne({ email, password });

  if (user) {
    res.json({ message: "Logged in successfully", user });
  } else {
    res.status(403).json({ message: "Log in failed" });
  }
});

app.post('/signup', async (req, res) => {
    console.log('control reaches here');
  const { email, password } = req.headers;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: "Sign up successful", user: newUser });
  } else {
    res.status(403).json({ message: "User Already Exists" });
  }
});
app.listen(3001,()=>{
    console.log("listening on port 3001");
})