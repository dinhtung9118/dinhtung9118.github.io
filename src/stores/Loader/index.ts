import { createStore, createHook, createContainer } from "react-sweet-state";

import { Completer } from "untils";

const Store = createStore({
  name: "Loader",
  initialState: {
    count: 0,
    total: 0,
    completer: new Completer(),
  },
  actions: {
    push: (promise: Promise<any>, lazy = 250) => async ({
      getState,
      setState,
    }) => {
      (() => {
        const { total } = getState();
        if (total === 0) {
          setState({ total: total + 1, completer: new Completer() });
        } else {
          setState({ total: total + 1 });
        }
      })();

      const { completer } = getState();
      await Promise.all([Promise.delay(lazy), promise.catch(console.warn)]);

      (() => {
        const { count, total } = getState();
        if (completer.completed) return;
        if (count + 1 === total) {
          completer.resolve();
          requestAnimationFrame(() => {
            setState({ count: 0, total: 0 });
          });
        } else {
          setState({ count: count + 1 });
        }
      })();

      await completer.promise;
      return promise;
    },

    reset: () => ({ getState, setState }) => {
      const { completer } = getState();
      if (!completer.completed) {
        completer.resolve();
        setState({ count: 0, total: 0 });
      }
    },
  },
});

const useActions = createHook(Store, { selector: () => 0 });

export const useLoader = createHook(Store);

export const useLoaderActions = () => useActions()[1];

export const useLoaderStatus = createHook(Store, {
  selector: ({ total, count }) => total !== count,
});

export const LoaderContainer = createContainer(Store);
