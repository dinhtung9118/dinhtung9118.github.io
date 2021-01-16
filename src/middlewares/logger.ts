import {defaults, StoreState} from 'react-sweet-state'
import {isDevEnv} from "config";

const logger=(storeState: StoreState<any>)=>(next: any)=>(fn: any)=> {
  console.groupCollapsed('Store', storeState.key);

  console.log('prev state:', JSON.parse(JSON.stringify(storeState.getState())));
  console.log('payload', fn);
  const result = next(fn);
  console.log('next state', JSON.parse(JSON.stringify(storeState.getState())));
  console.groupEnd();
  return result;
}

if(isDevEnv()){
  defaults.middlewares.add(logger)
}
