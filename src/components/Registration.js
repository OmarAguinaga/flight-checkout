import React, { Component } from "react";

import UserForm from "./UserForm";
import FlightForm from "./FlightForm";
import flightSeats from "./../data";

class Registration extends Component {
  state = {
    flightSeats: flightSeats,
    currentStep: 1,
    passangerName: "",
    error: null,
    selectedSeat: []
  };
  showSeatInfo = seat => {
    const selectedSeat = flightSeats.filter(s => s.seatNumber === seat);
    this.setState({ selectedSeat });
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
    let { currentStep } = this.state;
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
        <div>
          {(() => {
            switch (this.state.currentStep) {
              case 1:
                return (
                  <div>
                    <h3>Steep 1 of 3</h3>
                    <UserForm
                      handleChange={this.handleChange}
                      passangerName={this.state.passangerName}
                    />
                  </div>
                );
              case 2:
                return (
                  <div>
                    <h3>Steep 2 of 3</h3>
                    <FlightForm
                      showSeatInfo={this.showSeatInfo}
                      flightSeats={this.state.flightSeats}
                      selectedSeat={this.state.selectedSeat}
                    />
                  </div>
                );
              case 3:
                return <h3>Steep 3 of 3</h3>;
              default:
                null;
            }
          })()}
        </div>
        {this.state.error && <p>{this.state.error}</p>}
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
