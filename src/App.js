
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './store/reducers';
//import { fetchWeatherData } from './store/actions/index';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import WeatherHomeScreen from './screens/WeatherHomeScreen'

const persistConfig = {
  key: 'FETCH_WEATHER',
  storage: storage,
  whitelist: ['weather'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(ReduxThunk));
persistStore(store);

//store.dispatch(fetchWeatherData('110043','IN'));

const App = ()=>{
  return <Provider store = {store}><WeatherHomeScreen/></Provider>
  //return <NavigationContainer><AppNavigator/></NavigationContainer>

};

export default App;
