import React, { Component, Fragment } from "react";
import _ from "lodash";

import UserForm from "./UserForm";
import FlightForm from "./FlightForm";
import CheckoutForm from "./CheckoutForm";
import flightSeats from "./../data";

class Registration extends Component {
  state = {
    flightSeats: flightSeats,
    currentStep: 1,
    passangerName: "",
    error: null,
    selectedSeat: {},
    randomSeat: false
  };
  showSeatInfo = seat => {
    const selectedSeat = flightSeats.filter(s => s.seatNumber === seat)[0];
    console.log(selectedSeat);
    this.setState({ selectedSeat, randomSeat: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this._next();
  };

  handleChange = e => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  handleFirstSteep = () => {
    if (!this.state.passangerName) {
      this.setState({ error: "You must provide a Name" });
    }
  };

  saveFormData = currentStep => {
    switch (currentStep) {
      case 1:
        this.handleFirstSteep();
      default:
        break;
    }
  };

  selectRandomSeat = () => {
    const { flightSeats } = this.state;
    const freeSeats = flightSeats.filter(s => s.price === 0);
    let i, randomSeat;

    /** select a free seat if possible if not then select any seat, this does not make
     * distintion between $5 and $10. If I had more time it might
     **/
    if (freeSeats.length) {
      i = Math.floor(Math.random() * freeSeats.length);
      randomSeat = freeSeats[i];
    } else {
      i = Math.floor(Math.random() * flightSeats.length);
      randomSeat = flightSeats[i];
    }
    this.setState({ selectedSeat: randomSeat, randomSeat: true });
    console.log(randomSeat);
  };

  _next = async () => {
    let { currentStep } = this.state;
    this.setState({ error: null });
    await this.saveFormData(currentStep);
    if (!this.state.error) {
      currentStep >= 2 ? (currentStep = 3) : currentStep++;
      this.setState({ currentStep });
    }
  };

  _skip = () => {
    this.setState({ error: null });
    let { currentStep, selectedSeat } = this.state;

    if (currentStep === 2 && _.isEmpty(selectedSeat)) {
      this.selectRandomSeat();
    }

    currentStep >= 2 ? (currentStep = 3) : currentStep++;
    this.setState({ currentStep });
  };

  _prev = () => {
    let { currentStep } = this.state;
    currentStep <= 1 ? (currentStep = 1) : currentStep--;
    this.setState({ currentStep });
  };

  render() {
    return (
      <div className="registration__form">
        <Fragment>
          {(() => {
            switch (this.state.currentStep) {
              case 1:
                return (
                  <Fragment>
                    <h3>Steep 1 of 3</h3>
                    <UserForm
                      handleChange={this.handleChange}
                      passangerName={this.state.passangerName}
                      handleSubmit={this.handleSubmit}
                    />
                  </Fragment>
                );
              case 2:
                return (
                  <Fragment>
                    <h3>Steep 2 of 3</h3>
                    <FlightForm
                      showSeatInfo={this.showSeatInfo}
                      flightSeats={this.state.flightSeats}
                      selectedSeat={this.state.selectedSeat}
                    />
                  </Fragment>
                );
              case 3:
                return (
                  <Fragment>
                    <h3>Steep 3 of 3</h3>
                    <CheckoutForm
                      passangerName={this.state.passangerName}
                      selectedSeat={this.state.selectedSeat}
                      randomSeat={this.state.randomSeat}
                    />
                  </Fragment>
                );
              default:
                null;
            }
          })()}
        </Fragment>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <div className="registration__controlls">
          <button onClick={this._prev}>Prev</button>
          <button onClick={this._skip}>Skip</button>
          <button onClick={this._next}>Next</button>
        </div>
      </div>
    );
  }
}

export default Registration;
