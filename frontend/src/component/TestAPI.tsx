import React, { Component } from "react";
import axios from "axios";

type State = {
  loading: boolean;
  username: string;
};

class TestAPI extends Component<{}, State> {
  state: State = {
    loading: true,
    username: ""
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/users/1/?format=json`).then(response => {
      const username = response.data.username;
      this.setState({
        loading: false,
        username: username
      });
    });
  }

  render() {
    const { loading, username } = this.state;
    return (
      <div>{loading ? "Loading" : "Success! Username is " + username}</div>
    );
  }
}

export default TestAPI;
