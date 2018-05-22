import React, { Component } from "react";

const dummyFlightPrice = 125;

class CheckoutForm extends Component {
  render() {
    const { selectedSeat, passangerName, randomSeat } = this.props;
    return (
      <div className="checkout__form">
        <p>Flight Info</p>
        <p className="user__greeting">
          <span>Hello </span>
          {passangerName ? passangerName : ""}!
        </p>
        <div className="flight-info">
          <div>
            <span>Seat Number: </span>
            {selectedSeat.seatNumber}
          </div>
          <div>
            <span>Seat Location: </span>
            {selectedSeat.location}
          </div>
          <div>{selectedSeat.info}</div>
        </div>
        <div className="flight__total">
          <div>
            <span>Flight: </span>
            ${dummyFlightPrice}
          </div>
          <div>
            <span>Custom Seat: </span>
            ${randomSeat ? 0 : selectedSeat.price}
          </div>
        </div>

        <button className="btn__order">Check Out</button>
      </div>
    );
  }
}

export default CheckoutForm;
