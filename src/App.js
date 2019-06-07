import React from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const github_data = await axios.get("https://api.github.com/users");
      this.setState({ users: github_data.data, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
