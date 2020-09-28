import React, { useEffect, useState } from "react";
import { VegaLite } from "react-vega";
import { get } from "lodash";
import useGlobal from "./store";

const mySpec = {
  height: 300,
  autosize: {
    type: "fit",
    contains: "padding",
  },
  background: "transparent",
  config: { view: { stroke: "transparent" } },
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
      field: "seed_count",
      type: "quantitative",
      title: "Seed Count",
      axis: { grid: false },
    },
    tooltip: [
      { field: "name", type: "ordinal", title: "Plot Name" },
      {
        field: "panicle_count",
        type: "quantitative",
        title: "Panicle Count",
      },
      { field: "seed_count", type: "quantitative", title: "Seed Count" },
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
      mark: { type: "bar", color: "#E8F1CC" },
    },
    {
      transform: [{ filter: { selection: "brush" } }],
      mark: { type: "bar", color: "#8CBC00" },
    },
  ],
};

function App() {
  const [spec, setSpec] = useState(mySpec);

  const [scanData, block] = useGlobal(
    (state) => get(state.scanData, ["clemson-3p", "Sept2020-3p", "field1"]),
    (actions) => actions.block
  );

  useEffect(() => {
    block.getBlockDataForScan("clemson-3p", "Sept2020-3p", "field1");
  }, [block]);

  useEffect(() => {
    if (scanData !== undefined && scanData.length) {
      // Copy array by turning our object into a string, then reversing
      // to create an entirely new data structure. This is the only way
      // Vega will be happy, since it doesn't support unfrozen data.
      // TODO: figure out the correct immer.js application here.
      const thisScanData = JSON.parse(JSON.stringify(scanData));
      const data = {
        values: thisScanData,
        format: {
          parse: {
            seed_count: "number",
            panicle_count: "number",
          },
        },
      };
      setSpec((s) => {
        return { ...s, data };
      });
    }
  }, [scanData]);

  useEffect(() => {
    console.log(spec);
  }, [spec]);

  return (
    <div className="App">
      <VegaLite spec={spec} actions={false} />
    </div>
  );
}

export default App;
