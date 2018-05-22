const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create NinjaSchema & mdoel
const SeatSchema = new Schema({
  number: {
    type: Number,
    required: [true, "The seat number is required"]
  },
  info: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: [true, "The location is required"]
  },
  price: {
    type: Number,
    default: 0
  }
});

const Seat = mongoose.model("seat", SeatSchema);

module.exports = Seat;
