import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={sttyles.customTabBarView}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;

        if (route.name === 'Home') {
          imageSource = isFocused
            ? require('../assets/Images/greenHome.png')
            : require('../assets/Images/whiteHome.png');
        } else if (route.name === 'Search') {
          // You can add a different image source for the Search tab if needed
          imageSource = isFocused
            ? require('../assets/Images/greenSearch.png')
            : require('../assets/Images/whiteSearch.png');
        }

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={imageSource} style={{height: 25, width: 25}} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      barStyle={{backgroundColor: 'red'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const sttyles = StyleSheet.create({
  customTabBarView: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default TabNavigation;
