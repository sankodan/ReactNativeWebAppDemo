import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';


const Card = props => {

    return (<View style = {{...styles.card , ...props.style}}>{props.children}</View>)

};

Card.propTypes = {
    // ...prop type definitions here
    children: PropTypes.array.isRequired,
    style: PropTypes.object
  }


const styles = StyleSheet.create({
    card:{
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.6,
        color:'black',
        padding:20,
        borderRadius:10
    }
});

export default Card;