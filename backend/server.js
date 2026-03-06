require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//login-API

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
});

async function getUserFromDatabase(username) {
  const hashedPassword = await bcrypt.hash("admin", 10);

  const users = [
    {
      username: "admin",
      passwordHash: hashedPassword,
    },
  ];

  return users.find((user) => user.username === username);
}

app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserFromDatabase(username);

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
