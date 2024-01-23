import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import DetailStackNavigation from './DetailStackNavigation';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />

      <Stack.Screen
        name="DetailStackNavigation"
        component={DetailStackNavigation}
      />
    </Stack.Navigator>
  );
};

export default AppNavigationContainer;
