import React from "react";
import { withStatechart, State } from "react-automata";

export const statechart = {
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
            IDLE: "idle"
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

class AutoLogout extends React.Component {
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
    const { children } = this.props;
    return (
      <div style={containerStyle}>
        <div style={styles}>
          <State value="loggedIn.working">You are working</State>
          <State value="loggedIn.idle">You are about to be logged out</State>
        </div>
        <State value="loggedOff">
          <div>
            <p>You are logged off</p>
            <button onClick={() => this.props.transition("LOGGED_IN")}>
              Login
            </button>
          </div>
        </State>
        <State value="loggedIn.*">{children}</State>
      </div>
    );
  }
}

const containerStyle = {
  backgroundColor: "#f1f1f1",
  height: "100%",
  width: "100%"
};

const styles = {
  backgroundColor: "#0053ad",
  height: "40px",
  color: "#ffffff",
  fontSize: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export { AutoLogout };

export default withStatechart(statechart, { devTools: true })(AutoLogout);
