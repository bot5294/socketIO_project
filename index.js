let app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const PORT = 5294;
app.get("/", function (req, res) {
  res.sendFile(__dirname + `/index.html`);
});
let activeUsers = 0;
io.on("connection", function (socket) {
  console.log("user online");

  activeUsers++;
  socket.emit("broadcast", { desc: activeUsers + " Clients are online" });
  setTimeout(function () {
    // socket.send("website fully loaded");
    // socket.emit("customEvent", { desc: "website loaded in 3 sec" });
  }, 3000);
  socket.on("customClientEvent", (data) => {
    console.log(data);
  });

  socket.on("disconnect", function () {
    console.log("user offline");
  });
});

http.listen(PORT, (err) => {
  if (err) console.log(`error in starting server ${err}`);
  console.log(`Server is up and running at http://localhost:5294`);
});
