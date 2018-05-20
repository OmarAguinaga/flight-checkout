import React, { Component } from "react";

class UserForm extends Component {
  render() {
    return (
      <form className="user-form">
        <input
          type="text"
          name="passangerName"
          value={this.props.passangerName}
          placeholder="Your Name Here"
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default UserForm;
