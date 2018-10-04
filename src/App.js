import React from "react";

import { withStatechart, State } from "react-automata";

const statechart = {
  initial: "loggedIn",
  states: {
    loggedIn: {
      onEntry: "addMouseMoveListener",
      onExit: "removeMouseMoveListener",
      on: {
        LOGOUT: "loggedOff"
      },
      initial: "working",
      states: {
        working: {
          onEntry: ["resetTimers", "startIdleTimer"],
          on: {
            MOUSE_MOVE: "working",
            IDLE: "idle",
            LOGOUT: "working"
          }
        },
        idle: {
          onEntry: "startLogoutTimer",
          onExit: "resetTimers",
          on: {
            MOUSE_MOVE: "working"
          }
        }
      }
    },
    loggedOff: {
      on: {
        LOGGED_IN: "loggedIn"
      }
    }
  }
};

class App extends React.Component {
  idleTimer = null;
  logoutTimer = null;

  mousemoveListener = () => {
    this.props.transition("MOUSE_MOVE");
  };

  addMouseMoveListener = () => {
    document.addEventListener("mousemove", this.mousemoveListener);
  };

  removeMouseMoveListener = () => {
    document.removeEventListener("mousemove", this.mousemoveListener);
  };

  resetTimers = () => {
    clearTimeout(this.idleTimer);
    clearTimeout(this.logoutTimer);
  };

  startIdleTimer = () => {
    const { transition } = this.props;
    this.idleTimer = setTimeout(() => transition("IDLE"), 5000);
  };

  startLogoutTimer = () => {
    const { transition } = this.props;
    this.logoutTimer = setTimeout(() => transition("LOGOUT"), 5000);
  };

  render() {
    return (
      <div>
        <State value="loggedIn.working">You are working</State>
        <State value="loggedIn.idle">You are about to be logged out</State>
        <State value="loggedOff">
          <div>
            <p>You are logged off</p>
            <button onClick={() => this.props.transition("LOGGED_IN")}>
              Login
            </button>
          </div>
        </State>
      </div>
    );
  }
}

export default withStatechart(statechart)(App);
