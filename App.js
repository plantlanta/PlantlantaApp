import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EventListScreen from './src/screens/EventListScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';

Amplify.configure(config);

const configurations = {
  EventList: {
    screen: EventListScreen,
    navigationOptions: {
      tabBarlabel: 'Events',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-menu" />;
      }
    }
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
      }
    }
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
      }
    }
  },
  CreateEvent: {
    screen: CreateEventScreen,
    navigationOptions: {
      tabBarLabel: 'Create Event',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-settings"
        />;
      }
    }
  }
};

const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff9',
    style: {
      backgroundColor: '#1faa00'
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 12
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
};

// App tabs located at the bottom of the screen
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

AppTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
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
            <Ionicons name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  }
});

// App stack for the drawer
const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator,
  Events: EventListScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
  CreateEvent: CreateEventScreen
});

// Auth stack
const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
      headerBackTitle: 'Back'
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`
    })
  }
});

export default createAppContainer(
  createSwitchNavigator({
    Authloading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator
  })
);
