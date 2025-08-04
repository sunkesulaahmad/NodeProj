const express = require("express");
const users = require("./mock-user-data.json");

const app = express();
const PORT = 8000;
app.listen(PORT, () => console.log(`Server Started! on ${PORT}`));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.send("Home Page");
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "User Updated!" });
  })
  .delete((req, res) => {
    return res.json({ status: "User Deleted!" });
  });

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const userDetails = req.body;
  console.log("User Data: ", userDetails);

  return res.json({ status: "User Added!" });
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
