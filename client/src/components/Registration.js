import React, { Component, Fragment } from "react";
import _ from "lodash";
import axios from "axios";

import UserForm from "./UserForm";
import FlightForm from "./FlightForm";
import CheckoutForm from "./CheckoutForm";
import Thankyou from "./Thankyou";

class Registration extends Component {
  state = {
    flightSeats: [],
    currentStep: 1,
    passangerName: "",
    error: null,
    selectedSeat: {},
    randomSeat: false
  };

  componentWillMount() {
    this.getSeats();
  }

  getSeats = async () => {
    try {
      const { data } = await axios.get("/api/seat");
      this.setState({ flightSeats: data });
    } catch (error) {
      this.setState({ error: "Ooops! Something went wrong" });
    }
  };

  showSeatInfo = seat => {
    const selectedSeat = this.state.flightSeats.filter(s => s._id === seat)[0];
    console.log(selectedSeat);
    this.setState({ selectedSeat, randomSeat: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this._next();
  };

  checkinConfirmation = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/seat/${this.state.selectedSeat._id}`, {
        available: false
      });
      this.setState({ currentStep: 4 });
    } catch (error) {
      this.setState({ error: "Ooops! Something went wrong" });
    }
  };

  handleChange = e => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  // Handle each steep of the form
  handleFirstSteep = () => {
    if (!this.state.passangerName) {
      this.setState({ error: "You must provide a Name or skip this steep" });
    }
  };
  handleSecondSteep = () => {
    this._skip();
  };

  handleThridSteep = () => {
    console.log("here");
  };

  saveFormData = currentStep => {
    if (currentStep === 1) {
      this.handleFirstSteep();
    } else if (currentStep === 2) {
      this.handleSecondSteep();
    } else return;
  };

  selectRandomSeat = async () => {
    const { data } = await axios.get("/api/seat/random");
    this.setState({ selectedSeat: data, randomSeat: true });
  };

  _next = async () => {
    let { currentStep } = this.state;
    this.setState({ error: null });
    await this.saveFormData(currentStep);
    console.log(this.state.error);
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
                      getSeats={this.getSeats}
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
                      checkinConfirmation={this.checkinConfirmation}
                    />
                  </Fragment>
                );
              case 4:
                return (
                  <Fragment>
                    <Thankyou />
                  </Fragment>
                );
              default:
                null;
            }
          })()}
        </Fragment>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {!(this.state.currentStep === 4) && (
          <div className="registration__controlls">
            <button onClick={this._prev}>Prev</button>
            {!(this.state.currentStep === 3) && (
              <Fragment>
                <button onClick={this._skip}>Skip</button>
                <button onClick={this._next}>Next</button>
              </Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Registration;
