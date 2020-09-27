import React, { useEffect, useState } from "react";
import { Vega } from "react-vega";

const mySpec = {
  height: 300,
  width: 1000,
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
      field: "amount",
      type: "quantitative",
      title: "Count",
      axis: { grid: false },
    },
    tooltip: [
      { field: "id", type: "ordinal", title: "ID" },
      { field: "amount", type: "quantitative", title: "Count" },
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
      mark: { type: "bar", color: "#C0F1FD" },
    },
    {
      transform: [{ filter: { selection: "brush" } }],
      mark: { type: "bar", color: "#61DBFB" },
    },
  ],
};

function App() {
  const [selection, setSelection] = useState(null);
  const [spec, setSpec] = useState(mySpec);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`./data.json`);
      const data = await response.json();
      setData({ values: data });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSpec((s) => {
      return { ...s, data: data };
    });
  }, [data]);

  function handleSignals(...args) {
    setSelection(args[1].id);
  }

  const signalListeners = { brush: handleSignals };

  return (
    <div className="App">
      <Vega spec={spec} actions={false} signalListeners={signalListeners} />
      {selection ? (
        selection.map((id) => <div key={id}>{id}</div>)
      ) : (
        <div>No active selection</div>
      )}
    </div>
  );
}

export default App;
