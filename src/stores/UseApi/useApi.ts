import { useLoaderActions } from "../loader";
import { useCallback, useEffect, useState } from "react";

export function useApi<R>(query: () => Promise<R>, deps: any[] = []) {
  const loader = useLoaderActions();
  const [state, setState] = useState<R | undefined>();
  query = useCallback(query, deps);
  useEffect(() => {
    loader.push(query().then(setState));
  }, [loader, query]);
  return state;
}
