import React from 'react';
import AppNavigationContainer from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigationContainer />
    </NavigationContainer>
  );
};

export default App;
