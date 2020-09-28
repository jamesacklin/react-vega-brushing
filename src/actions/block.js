import axios from "axios";
import produce from "immer";
import { set, sortBy } from "lodash";

// eslint-disable-next-line import/prefer-default-export
export const getBlockDataForScan = async (
  store,
  clientId,
  scanId,
  blockId,
  request = axios
) => {
  let status = "LOADING";
  store.setState(
    produce((draft) => {
      draft.status.scanData = status;
    })
  );
  try {
    const queryString = `https://bloomfield-customer.s3.us-east-2.amazonaws.com/clemson-3p/Sept2020-3p/scanData.json`;
    const response = await request.get(queryString);
    const scanData = response.data[blockId];
    const orderedScanData = sortBy(scanData, ["id"]);
    store.setState(
      produce((draft) => {
        set(draft.scanData, [clientId, scanId, blockId], orderedScanData);
        draft.status.scanData = "SUCCESS";
      })
    );
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    status = isError404 ? "NOT_FOUND" : "ERROR";
    store.setState(
      produce((draft) => {
        draft.status.scanData = status;
      })
    );
  }
};

export const setFilterText = (store, input) => {
  store.setState(
    produce((draft) => {
      draft.logFilter = input;
    })
  );
};

export const setSelectedLogs = (store, input) => {
  store.setState(
    produce((draft) => {
      draft.selectedLogs = input;
    })
  );
};
