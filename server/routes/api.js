const express = require("express");
const router = express.Router();

const Seat = require("../models/seat");

// get a list of all seats from the db
router.get("/seat", async (req, res, next) => {
  try {
    const seats = await Seat.find({});
    res.send(seats);
  } catch (e) {
    next(e);
  }
});

// get random seat
router.get("/seat/random", async (req, res, next) => {
  const seats = await Seat.find();
  const availableSeats = seats.filter(s => s.available);
  i = Math.floor(Math.random() * availableSeats.length);
  res.send(availableSeats[i]);
});

// add a new seat to the db
router.post("/seat", async (req, res, next) => {
  console.log(req.body);
  try {
    const seat = await Seat.create(req.body);
    res.send(seat);
  } catch (e) {
    next(e);
  }
});

// update seat in the db
router.put("/seat/:id", async (req, res, next) => {
  try {
    await Seat.findByIdAndUpdate({ _id: req.params.id }, req.body);
    const seat = await Seat.findOne({ _id: req.params.id });
    res.send(seat);
  } catch (e) {
    next(e);
  }
});

router.delete("/seat/:id", async (req, res, next) => {
  const seat = await Seat.findByIdAndRemove({ _id: req.params.id });
  res.send(seat);
});

module.exports = router;
