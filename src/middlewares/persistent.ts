import {defaults, StoreState} from 'react-sweet-state'
import databases from 'storages'
import {AUTHENTICATION_STORE} from 'stores/authenticationsStore/authentication'


const WHITE_LIST = [AUTHENTICATION_STORE];

const persistent=(storeState: StoreState<any>)=>(next: any)=>(fn: any)=> {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList: string[] = WHITE_LIST.filter((store) => key.includes(store));
  if(isWhiteList.length >0){
    const state = storeState.getState();
    console.log('keyyyyyy', key);
    console.log('state 111', state);
    databases.setItem(storeState.key, state).catch((err: Error) => {
      console.error(err);
    });
  }

  return result;
}

defaults.middlewares.add(persistent)
