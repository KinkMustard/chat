const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(server));
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");

const SocketManager = require("./SocketManager");
const schema = require("./schema/schema");

// require("./models/Color");

// const ColorModel = mongoose.model("colors");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://KinkMustard:Czy4306162@ds147659.mlab.com:47659/connect"
);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

io.on("connection", SocketManager);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
