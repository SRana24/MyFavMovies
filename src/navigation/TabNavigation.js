import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  // this use effect is for keyboard avoding purpose beacuse customtabbar is being used and does not support props.
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (keyboardVisible) {
    // return null when keyboard is visible to hide the custom tab bar
    return null;
  }
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
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}
      barStyle={{backgroundColor: 'red'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
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
