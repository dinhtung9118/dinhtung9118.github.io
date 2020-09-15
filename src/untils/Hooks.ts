import { useEffect, useState, useCallback } from "react";
import { Listenable, ValueListenable } from "./Notifier/ChangeNotifier";

type IActions = Record<string, (event: KeyboardEvent) => any>;

export const useHotkey = (
  actions: IActions,
  condition = (event: KeyboardEvent) => event.ctrlKey || event.metaKey,
) => {
  condition = useCallback(condition, [actions]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (condition(event)) {
        const char = String.fromCharCode(event.which);
        const action = actions[char];
        if (!action || action?.(event) === false) return;
        event.preventDefault();
        return false;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [actions, condition]);
};

export function useListenable(listen: Listenable) {
  const [state, setState] = useState(false);
  useEffect(() => listen.listen(() => setState(!state)), [listen, state]);
}

export function useValueChanged<T = unknown>(valueChange: ValueListenable<T>) {
  useListenable(valueChange);
  return valueChange.value;
}
