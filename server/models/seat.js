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
    type: String
  },
  price: {
    type: Number
  }
});

const Seat = mongoose.model("seat", SeatSchema);

module.exports = Seat;
