let mongoose = require("mongoose");
let schema = mongoose.Schema({
  name: { type: String, required: true },
  shift_date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});
let shift = (module.exports = mongoose.model("shifts", schema));
module.exports.get = (callback, limit) => shift.find(callback).limit(limit);

// exports.Shift = mongoose.model("shifts", schema);
// exports.get = (callback, limit) => this.Shift.find(callback).limit(limit);
