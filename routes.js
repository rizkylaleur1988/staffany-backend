let router = require("express").Router();
let shift = require("./controllers/ShiftController");

router.get("/", function (req, res) {
  res.json({ status: "ok", message: "Welcome to restful API" });
});

router.route("/shift").get(shift.index).post(shift.store);
router.route("/shift/:id").get(shift.show).put(shift.update).patch(shift.update).delete(shift.delete);

module.exports = router;
