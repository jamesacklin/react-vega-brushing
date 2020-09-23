import React, { useState } from "react";
import data from "./data.json";
import { orderBy } from "lodash";
import { Vega } from "react-vega";
import ContainerDimensions from "react-container-dimensions";

const spec = {
  height: 300,
  autosize: {
    type: "fit",
    contains: "padding",
  },
  background: "transparent",
  config: { view: { stroke: "transparent" } },
  data: { values: orderBy(data, "seeds", "desc") },
  encoding: {
    x: {
      field: "id",
      type: "ordinal",
      sort: "-y",
      axis: {
        labels: false,
        ticks: false,
        grid: false,
        title: false,
      },
    },
    y: {
      field: "seeds",
      type: "quantitative",
      title: "Seed Count",
      axis: { grid: false },
    },
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
      mark: { type: "area", color: "#E8F1CC" },
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
    <div className="App" style={{ width: "100%" }}>
      <ContainerDimensions>
        {({ width, height }) => {
          spec.width = width;
          return (
            <Vega
              spec={spec}
              actions={false}
              data={data}
              signalListeners={signalListeners}
            />
          );
        }}
      </ContainerDimensions>

      {selection ? (
        selection.map((id) => <div key={id}>{id}</div>)
      ) : (
        <div>Showing all rows</div>
      )}
    </div>
  );
}

export default App;
