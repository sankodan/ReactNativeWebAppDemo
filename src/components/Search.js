import React from 'react';
import {View,TextInput,StyleSheet,Button} from 'react-native';

import PropTypes from 'prop-types';


const Search = props =>{
    
    return(
        <View style = {styles.container}>
            <TextInput value = {props.value} placeholder = 'Enter zipcode for India' style={styles.input} onChangeText = {props.onChangeText}/>
            <Button title = 'Search' onPress = {props.onPress} style = {styles.button}/>
        </View>
    )
};

Search.propTypes = {
    value: PropTypes.string,
    onPress: PropTypes.func,
    onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        width:'100%',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5,
    },

    input: {
        height: 40, 
        borderColor: 'lightgray', 
        borderWidth: 1,
        width:'80%',
        borderRadius:5,
        paddingHorizontal:10
      },
      button:{
          width:'20%',
          alignSelf:'center'
      }

});

export default Search;