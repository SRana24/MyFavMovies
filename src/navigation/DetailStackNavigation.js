import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import MovieDetail from '../screens/MovieDetail/MovieDetail';

const DetailStack = createNativeStackNavigator();

const DetailStackNavigation = () => {
  return (
    <DetailStack.Navigator
      initialRouteName="MovieDetail"
      screenOptions={{headerShown: false}}>
      <DetailStack.Screen name="MovieDetail" component={MovieDetail} />
    </DetailStack.Navigator>
  );
};

export default DetailStackNavigation;
