import { FETCH_WEATHER,FETCH_CITY } from './types';

import API from '../../API/api'

export const fetchWeather = (weatherData) => {
  return {
    type: FETCH_WEATHER,
    weatherData:weatherData
  }
};

export const fetchCity = (cityData) => {
    return {
      type: FETCH_CITY,
      cityData:cityData
    }
  };

  export const isLoadingData = (isLoading) => {
    return {
      type: "IS_LOADING",
      isLoading:isLoading
    }
  };

  export const isError = (error) => {
    return {
      type: "IS_ERROR",
      error:error
    }
  };

  export const noInternetError = (error,zipcode) => {
    return {
      type: "NO_INTERNET",
      error:error,
      zipcode:zipcode
    }
  };

  export const setZipcode = (zipcode) => {
    return {
      type: "SET_ZIPCODE",
      zipcode:zipcode
    }
  };

export const fetchWeatherData = (zipcode,countryCode) => {
  return (dispatch) => {
    dispatch(isLoadingData(true));
    return getWeatherAPI(zipcode, countryCode)
      .then(response => {
        handleResponse(response, dispatch, zipcode);
      })
      .catch(error => {
        //throw(error);
        handleError(error, dispatch, zipcode);
      });
  };
};

function handleError(error, dispatch, zipcode) {
  if (error.response != null) {
    dispatch(setZipcode(zipcode));
    dispatch(isError(error));
  }
  else {
    dispatch(noInternetError(error, zipcode));
  }
}

function handleResponse(response, dispatch, zipcode) {
  const weatherData = response.data.list.reduce((listData, item) => {
    (listData[item.dt_txt.split(" ")[0]] = listData[item.dt_txt.split(" ")[0]] || []).push(item);
    return listData;
  }, {});
  const weatherArray = [];
  for (const key in weatherData) {
    var dict = {
      "key": key,
      "data": weatherData[key]
    };
    weatherArray.push(dict);
  }
  console.log(weatherArray);
  dispatch(setZipcode(zipcode));
  dispatch(fetchWeather(weatherArray));
  dispatch(fetchCity(response.data.city));
  dispatch(isLoadingData(false));
}

function getWeatherAPI(zipcode, countryCode) {
  return API.get(`forecast?zip=${zipcode},${countryCode}&appid=96716c5df7dbaf430d3a0f03660626bd`);
}
