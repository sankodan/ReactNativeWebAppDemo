import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'FETCH_WEATHER',
  storage: storage,
  whitelist: ['weather'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export {store,persistor};