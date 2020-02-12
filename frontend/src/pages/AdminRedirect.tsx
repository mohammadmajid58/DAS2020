import React, { Component } from "react";

export default class AdminRedirect extends Component {
  render() {
    document.location.href = "/admin/";
    return <div />;
  }
}
