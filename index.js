const express = require("express");
const users = require("./mock-user-data.json");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Mongo Connection
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6')
mongoose
  .connect("mongodb://127.0.0.1:27017/nodeProj")
  .then(() => console.log("MongoDb Connected!"))
  .catch((err) => console.log("MongoDb not connected!", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

app.listen(PORT, () => console.log(`Server Started! on ${PORT}`));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.send("Home Page!");
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found!" });
    return res.json({ user });
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "S"})
    return res.json({ status: "User Updated!" });
  })
  .delete( async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "User Deleted!" });
  });

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});

  const html = `
    <ul>
    ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});

  return res.json(allUsers);
});

app.post("/api/users", async (req, res) => {
  const userDetails = req.body;
  console.log("User Data: ", userDetails);
  if (
    !userDetails ||
    !userDetails.firstName ||
    !userDetails.gender ||
    !userDetails.email ||
    !userDetails.jobTitle
  ) {
    return res
      .status(400)
      .json({ msg: "Please dont not leave required fields black." });
  }
  const result = await User.create({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    gender: userDetails.gender,
    email: userDetails.email,
    jobTitle: userDetails.jobTitle,
  });
  return res.status(201).json({ msg: "User Added Successfully!" });
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// const myServer = http.createServer(app);

// const myServer = http.createServer((req, res) => {
//   console.log("New Request Received!");
//   res.end("Response Ended");
// });

// myServer.listen(8000, () => {
//   console.log("Server Started!");
// });
