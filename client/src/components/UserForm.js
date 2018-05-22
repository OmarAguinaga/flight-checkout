import React, { Component } from "react";

class UserForm extends Component {
  render() {
    return (
      <form className="user__form" onSubmit={this.props.handleSubmit}>
        <input
          type="text"
          name="passangerName"
          className="user__input"
          value={this.props.passangerName}
          placeholder="Your Name Here"
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default UserForm;
