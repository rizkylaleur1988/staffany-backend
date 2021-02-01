let Shift = require("./../models/Shift");
let moment = require("moment");

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

  const startTime = moment().set("hours", start_time.split(":")[0]).set("minutes", start_time.split(":")[1]);
  const endTime = moment().set("hours", end_time.split(":")[0]).set("minutes", end_time.split(":")[1]);
  const duration = moment.duration(endTime.diff(startTime)).asMinutes();

  if (parseInt(duration) < 0) {
    res.json({ status: false, message: "Your start time greater than end time" });
  } else if (duration === 0) {
    res.json({ status: false, message: "Your start time same with end time" });
  } else {
    const shift = new Shift({ name, shift_date, start_time, end_time });
    shift.save((err, data) => {
      if (err) res.json({ status: false, message: err });
      res.json({ status: true, data, message: "New data created" });
    });
  }
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

  const startTime = moment().set("hours", start_time.split(":")[0]).set("minutes", start_time.split(":")[1]);
  const endTime = moment().set("hours", end_time.split(":")[0]).set("minutes", end_time.split(":")[1]);
  const duration = moment.duration(endTime.diff(startTime)).asMinutes();
  if (parseInt(duration) < 0) {
    res.json({ status: false, message: "Your start time greater than end time" });
  } else if (duration === 0) {
    res.json({ status: false, message: "Your start time same with end time" });
  } else {
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
  }
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
