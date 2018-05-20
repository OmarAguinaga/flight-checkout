import React, { Component } from "react";

class FlightForm extends Component {
  render() {
    const { selectedSeat, flightSeats, showSeatInfo } = this.props;
    return (
      <div>
        <h4>Select your seat</h4>
        <div className="plane">
          {flightSeats.map(seat => (
            <button
              key={seat.seatNumber}
              onClick={() => showSeatInfo(seat.seatNumber)}
              value={seat.price}
              className="plane__seat"
            >
              ${seat.price}
            </button>
          ))}
        </div>
        {selectedSeat[0] && (
          <div>
            <p>{selectedSeat[0].info}, this seat is located in the </p>
            <p>Location: {selectedSeat[0].location} </p>
            <p>Seat Number:{selectedSeat[0].seatNumber}</p>
          </div>
        )}
      </div>
    );
  }
}

export default FlightForm;
