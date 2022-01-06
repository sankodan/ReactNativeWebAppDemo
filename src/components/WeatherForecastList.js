import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from "react-native";

import moment from "moment";
//import Card from '../components/Card'
import PropTypes from 'prop-types';

const WeatherForecastList = (props) => {

 const renderItem = ({item})=> {
    return (<View style={styles.item}>
            <Text style={styles.title}>{moment(item.dt_txt, 'YYYY-MM-DD h:mm:ss').format('h:mm a')}</Text>
            <Text style={styles.title}>{parseFloat(item.main.temp -273.15).toFixed(2)}°C</Text>
            </View>
  );
    };

    return (
       <SectionList
      sections={props.weatherData}
      keyExtractor={(item) => item.dt_txt}
      renderItem = {renderItem}
      renderSectionHeader={({ section: { key } }) => (
        <View style={styles.header}><Text style = {styles.title}>{moment(key, 'YYYY-MM-DD h:mm:ss').format('MMMM Do YYYY')}</Text></View>
      )}/>
      );
};

WeatherForecastList.propTypes = {
  weatherData: PropTypes.array,
  item: PropTypes.object,

};

export default WeatherForecastList;

const styles = StyleSheet.create({
  item: {
    width:'100%',
    minHeight:40,
    marginBottom:10,
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between',
    backgroundColor:'black',
    borderRadius:5

  },
  header: {
    fontSize: 24,
    height: 40,
    backgroundColor:'#fe414d',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  title: {
    fontSize: 24,
    textAlign:'center',
    color:'white',
    paddingHorizontal:10
  }
});
