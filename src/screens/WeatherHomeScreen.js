import React, { Component } from 'react';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native';
import Search from '../components/Search';
import WeatherForecastList from '../components/WeatherForecastList';
import Loader from '../components/Loader'
import { connect } from 'react-redux';
import { fetchWeatherData } from '../store/actions/index';
import moment from "moment";

import PropTypes from 'prop-types';


class WeatherHomeScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            zipcode:this.props.zipcode,
        }
    }

    searchInputHandler = () =>{
       this.props.fetchWeatherData(this.state.zipcode,'IN')
    }

    searchTextChangeHandler = (text) =>{
        this.setState({zipcode:text});
    }

      componentDidMount = () => {
        this.props.fetchWeatherData(this.props.zipcode,'IN')
      }

    render(){

        const {zipcode } = this.state;

      const weatherView =  <View style={{ flex: 1,marginBottom:20 }}>
          {this.props.cityData != null ? <View>
              <Text style={styles.title}>{this.props.cityData.name}-
        {this.props.cityData.country}</Text>
        <Text style={styles.title}>Sunrise: {moment.unix(this.props.cityData.sunrise).format("hh:mm a")} -
          Sunset: {moment.unix(this.props.cityData.sunset).format("hh:mm a")}</Text>
        </View>:<Text></Text>}
        <WeatherForecastList weatherData={this.props.weatherData} /></View>;

        return (
            <View style={{ flex:1,paddingHorizontal:18,paddingVertical:44}}>
              <Search value = {zipcode} onPress = {this.searchInputHandler} onChangeText = {this.searchTextChangeHandler}/>
              {this.props.isLoading ?
              <Loader/> : (this.props.error !=null && this.props.weatherData == null)?
              <Text>Error in Loading. Please enter valid zipcode</Text>: (this.props.error !=null && this.props.zipcode != this.state.zipcode) ?
              <Text>No internet connection. Please try again</Text>:weatherView}
            </View>
          );
    }

}

WeatherHomeScreen.propTypes = {
    fetchWeatherData: PropTypes.func,
    searchTextChangeHandler: PropTypes.func,
    isLoading:PropTypes.bool,
    error:PropTypes.object,
    cityData:PropTypes.object,
    weatherData:PropTypes.array,
    zipcode:PropTypes.string
  };

const styles = StyleSheet.create({

    screen:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
    },
    title: {
        fontSize: 20,
        textAlign:'center',
        color:'black',
        marginVertical:5,

      }

});

const mapStateToProps = state => {
    return {
        weatherData: state.weather.weatherData,
        cityData: state.weather.cityData,
        isLoading:state.weather.isLoading,
        error:state.weather.error,
        zipcode:state.weather.zipcode
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      fetchWeatherData: (zipcode,countryCode) => dispatch(fetchWeatherData(zipcode,countryCode)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherHomeScreen);


  /*
        this.setState({isLoading:true})
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},${countryCode}&appid=1f013c41c0d51a3d1a5cf4437f7867c3`)
          .then((response) => response.json())
          .then((json) => {
            this.setState({isLoading:false})
            const weatherData = json.list.reduce((listData, item) => {
            (listData[item.dt_txt.split(" ")[0]] = listData[item.dt_txt.split(" ")[0]] || []).push(item);
            return listData;
          }, {});
        const weatherArray = [];
        for (const key in weatherData) {
            var dict = {
                "key": key,
                "data": weatherData[key]
              };
              weatherArray.push(dict)
          }
        console.log(weatherArray)
        this.setState({
            weatherData: weatherArray
          })
            return weatherArray;
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.error(error);
            this.setState({
                weatherData: []
              })
          });
          


    getWeatherFromApi(zipcode,countryCode){
        this.setState({isLoading:true});
        API.get(`forecast?zip=${zipcode},${countryCode}&appid=1f013c41c0d51a3d1a5cf4437f7867c3`)
        .then(json => {
            this.setState({isLoading:false})
            const weatherData = json.data.list.reduce((listData, item) => {
            (listData[item.dt_txt.split(" ")[0]] = listData[item.dt_txt.split(" ")[0]] || []).push(item);
            return listData;
          }, {});
        const weatherArray = [];
        for (const key in weatherData) {
            var dict = {
                "key": key,
                "data": weatherData[key]
              };
              weatherArray.push(dict)
          }
        console.log(weatherArray)
        this.setState({
            weatherData: weatherArray
          })
        })
        .catch((error) => {
            this.setState({isLoading:false})
            console.error(error);
            this.setState({
                weatherData: []
              })
        });

      };


          */