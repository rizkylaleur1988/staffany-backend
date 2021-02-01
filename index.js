let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let routes = require("./routes");

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/staffany", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("open connection");
// });

const port = process.env.PORT || 8080;
app.get("/", (req, res) => res.send("Hello world"));
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Running staffany-backend on port ${port}`);
});
