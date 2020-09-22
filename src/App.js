import React, { useState } from "react";
import data from "./data.json";
import { orderBy } from "lodash";
import { Vega } from "react-vega";

const spec = {
  width: 1300,
  height: 300,
  data: { values: orderBy(data, "seeds", "desc") },
  encoding: {
    x: { field: "id", type: "ordinal", sort: "-y" },
    y: { field: "seeds", type: "quantitative", title: "Seed Count" },
    tooltip: [
      { field: "id", type: "ordinal", title: "Plot ID" },
      { field: "panicles", type: "quantitative", title: "Panicle Count" },
      { field: "seeds", type: "quantitative", title: "Seed Count" },
    ],
  },
  layer: [
    {
      selection: {
        brush: {
          type: "interval",
          encodings: ["x"],
        },
      },
      mark: { type: "area", color: "#988771" },
    },
    {
      transform: [{ filter: { selection: "brush" } }],
      mark: { type: "area", color: "#8CBC00" },
    },
  ],
};

function App() {
  const [selection, setSelection] = useState(null);

  function handleSignals(...args) {
    setSelection(args[1].id);
  }

  const signalListeners = { brush: handleSignals };

  return (
    <div className="App">
      <Vega spec={spec} data={data} signalListeners={signalListeners} />
      {selection ? (
        selection.map((id) => <div key={id}>{id}</div>)
      ) : (
        <div>Showing all rows</div>
      )}
    </div>
  );
}

export default App;
