import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

Amplify.configure(config);

const configurations = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-home" />;
      },
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-person"
        />;
      },
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-settings"
        />;
      },
    },
  },
};

const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true,
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff9',
    style: {
      backgroundColor: '#1faa00',
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 12,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
  },
};

// App tabs located at the bottom of the screen
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle = routeName;
  return {
    headerTitle,
  };
};

const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,
    // Set the header icon
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      ),
    }),
  },
});

// App stack for the drawer
const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator,
  Home: HomeScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
});

// Auth stack
const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
      headerBackTitle: 'Back',
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
});

export default createAppContainer(
  createSwitchNavigator({
    Authloading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
  })
);
