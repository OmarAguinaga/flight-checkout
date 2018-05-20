import React, { Component } from "react";
import _ from "lodash";

class FlightForm extends Component {
  render() {
    const { selectedSeat, flightSeats, showSeatInfo } = this.props;
    return (
      <div>
        <p className="form__instructions">Select your seat</p>
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
        {!_.isEmpty(selectedSeat) && (
          <div className="info">
            <div className="seat__info">
              <p>
                <span>Location: </span> {selectedSeat.location}{" "}
              </p>
              <p>
                <span>Seat Number: </span>
                {selectedSeat.seatNumber}
              </p>
            </div>
            <p className="extra__info">
              <span>Info:</span> {selectedSeat.info}{" "}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default FlightForm;
