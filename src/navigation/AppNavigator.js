import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherHomeScreen from '../screens/WeatherHomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        component={WeatherHomeScreen}
        options={{ title: 'Weather 5 day / 3 hour forecast' }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
