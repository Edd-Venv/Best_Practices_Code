import React, { createContext } from "react";
import Axios from "axios";

export const RootContext = createContext();

class RootContextProvider extends React.Component {
  state = {
    data: {},
    SearchLoaded: false,
    ServerList: "ShowServers",
    Refresh: "HideRefreshButton",
    value: ""
  };

  async componentDidMount() {
    document.title = "Home Page";
    const url = "http://localhost:4454/servers";
    await Axios.get(url).then(response => {
      response.data.forEach(function(data) {
        const update = [
          {
            id: data.id,
            name: data.name,
            status: data.status,
            ToggleDisplay: "visible",
            display: "hide"
          }
        ];
        response.data.push.apply(data, update);
      });
      this.setState({
        data: {
          data: response.data
        },
        length: response.data.length,
        Refresh: "HideRefreshButton",
        value: ""
      });
    });
  }

  handleSearchChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSearchSubmit = event => {
    document.title = "Search Page";
    event.preventDefault();
    const url = `http://localhost:4454/servers/${this.state.value}`;
    Axios.get(url).then(response => {
      [response.data].forEach(data => {
        const update = [
          {
            id: data.id,
            name: data.name,
            status: data.status,
            ToggleDisplay: "visible",
            display: "hide"
          }
        ];
        [response.data].push.apply(data, update);
      });

      this.setState({
        data: {
          data: [response.data]
        },
        SearchLoaded: true,
        ServerList: "HideServers",
        Refresh: "ShowRefreshButton",
        length: 1
      });
    });
  };
  handleStatusChanges = url => {
    Axios.put(url).then(response => {
      [response.data].forEach(data => {
        const update = [
          {
            id: data.id,
            name: data.name,
            status: data.status,
            ToggleDisplay: "visible",
            display: "hide"
          }
        ];
        [response.data].push.apply(data, update);
      });
      this.setState({
        data: {
          data: [response.data]
        },
        Refresh: "ShowRefreshButton",
        length: 1
      });
      this.HandleRefresh();
    });
  };

  handleTurnOff = id => {
    const url = `http://localhost:4454/servers/${id}/off`;
    this.handleStatusChanges(url);
  };
  handleTurnOn = id => {
    const url = `http://localhost:4454/servers/${id}/on`;
    this.handleStatusChanges(url);
  };
  handleReboot = id => {
    const url = `http://localhost:4454/servers/${id}/reboot`;
    this.handleStatusChanges(url);
  };

  HandleRefresh = async () => {
    document.title = "Home Page";
    const url = "http://localhost:4454/servers";
    await Axios.get(url).then(response => {
      response.data.forEach(function(data) {
        const update = [
          {
            id: data.id,
            name: data.name,
            status: data.status,
            ToggleDisplay: "visible",
            display: "hide"
          }
        ];
        response.data.push.apply(data, update);
      });
      this.setState({
        data: {
          data: response.data
        },
        length: response.data.length,
        Refresh: "HideRefreshButton",
        value: ""
      });
    });
  };

  handleButtonClick = id => {
    document.title = "Search Page";
    const url = `http://localhost:4454/servers/${id}`;
    Axios.get(url).then(response => {
      [response.data].forEach(data => {
        const update = [
          {
            id: data.id,
            name: data.name,
            status: data.status,
            ToggleDisplay: "hidden",
            display: "show"
          }
        ];
        [response.data].push.apply(data, update);
        this.setState({
          data: { data: [response.data] },
          length: 1
        });
      });
    });
  };

  render() {
    return (
      <RootContext.Provider
        value={{
          ...this.state,
          handleButtonClick: this.handleButtonClick,
          handleSearchChange: this.handleSearchChange,
          handleSearchSubmit: this.handleSearchSubmit,
          handleTurnOff: this.handleTurnOff,
          handleTurnOn: this.handleTurnOn,
          handleReboot: this.handleReboot
        }}
      >
        {this.props.children}
      </RootContext.Provider>
    );
  }
}
export default RootContextProvider;
