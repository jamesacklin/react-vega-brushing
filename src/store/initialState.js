/* eslint-disable import/prefer-default-export */

export const initialState = {
  viewerPosition: {
    value: {
      scale: 1,
      translation: {
        x: 0,
        y: 0,
      },
    },
  },
  logFilter: "",
  selectedLogs: [],
  status: {
    clients: "INITIAL",
    scanData: "INITIAL",
  },
  clients: {},
  imagery: {},
  scanData: {},
};
