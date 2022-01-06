import { FETCH_WEATHER,FETCH_CITY } from '../actions/types';

const intitalState = {
    zipcode:'110043',
    weatherData:[],
    cityData:null,
    isLoading:true,
    error:null
}

export default function weatherReducer(state = intitalState , action) {
  switch (action.type) {
    case "SET_ZIPCODE":
      return  {
        zipcode:action.zipcode,
        weatherData: state.weatherData,
        cityData: state.cityData,
        isLoading:false
      };
      case FETCH_WEATHER:
      return  {
        zipcode:state.zipcode,
        weatherData: action.weatherData,
        cityData: state.cityData,
        isLoading:false
      };
    case FETCH_CITY:
        return  {
          zipcode:state.zipcode,
            weatherData: state.weatherData,
            cityData: action.cityData,
            isLoading:false
          };
    case "IS_LOADING":
        return  {
          zipcode:state.zipcode,
            weatherData: state.weatherData,
            cityData: state.cityData,
            isLoading:action.isLoading
          };
    case "IS_ERROR":
        return  {
          zipcode:state.zipcode,
            weatherData: null,
            cityData: null,
            isLoading:false,
            error:action.error
          };
      case "NO_INTERNET":

        return  {
          zipcode:state.zipcode,
          weatherData: state.weatherData,
          cityData: state.cityData,
          isLoading:false,
          error:action.error
        };
        
    default:
      return state;
  }
}