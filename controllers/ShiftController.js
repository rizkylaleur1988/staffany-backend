const { json } = require("body-parser");
let Shift = require("./../models/Shift");

exports.index = (req, res) => {
  Shift.get((err, data) => {
    if (err) {
      res.status(500).json({ status: false, message: err });
    } else {
      res.json({ status: true, data, message: "Retrieved successfully" });
    }
  });
};

exports.store = (req, res) => {
  const { name, shift_date, start_time, end_time } = req.body;
  const shift = new Shift({ name, shift_date, start_time, end_time });
  shift.save((err, data) => {
    if (err) res.json({ status: false, message: err });
    res.json({ status: true, data, message: "New data created" });
  });
};

exports.show = (req, res) => {
  const { id } = req.params;
  Shift.findById(id)
    .then((data) => {
      res.json({ status: true, data, message: "Retrieved successfully" });
    })
    .catch((err) => {
      res.json({ status: false, message: err });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, shift_date, start_time, end_time } = req.body;
  Shift.findById(id)
    .then((shift) => {
      shift.name = name;
      shift.shift_date = shift_date;
      shift.start_time = start_time;
      shift.end_time = end_time;
      return shift.save();
    })
    .then((data) => {
      res.json({ status: true, data, message: "Data updated" });
    })
    .catch((err) => {
      res.json({ status: false, message: err });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Shift.remove({ _id: id })
    .then((data) => {
      res.json({ status: true, data, message: "Data deleted" });
    })
    .catch((err) => {
      res.json({ status: false, message: err });
    });
};
