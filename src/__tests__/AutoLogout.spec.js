import { testStatechart } from "react-automata";

import { AutoLogout, statechart } from "../AutoLogout";

it("tests statechart automatically", () => {
  testStatechart({ statechart }, AutoLogout);
});
