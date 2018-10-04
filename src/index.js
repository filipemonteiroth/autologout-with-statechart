import React from "react";
import { render } from "react-dom";

import AutoLogout from "./AutoLogout";

class App extends React.Component {
  render() {
    return (
      <AutoLogout>
        <div style={styles}>
          <PatientList />
        </div>
      </AutoLogout>
    );
  }
}

const styles = {
  backgroundColor: "#f1f1f1",
  display: "flex",
  width: "100%",
  height: "100%",
  padding: "20px"
};

const PatientList = () => (
  <table
    style={{
      width: "100%",
      height: "100%",
      textAlign: "left"
    }}
  >
    <thead>
      <tr>
        <th>Paciente</th>
        <th>Dr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Max</td>
        <td>John</td>
      </tr>
      <tr>
        <td>Ali</td>
        <td>John</td>
      </tr>
      <tr>
        <td>Bette</td>
        <td>Ane</td>
      </tr>
    </tbody>
  </table>
);

render(<App />, document.getElementById("root"));
