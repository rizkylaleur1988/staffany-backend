let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/staffany", { useNewUrlParser: true, useUnifiedTopology: true });
exports.db = mongoose.connection;
