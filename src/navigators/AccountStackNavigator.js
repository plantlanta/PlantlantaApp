import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import AccountScreen from '../screens/AccountScreen';

const RouteConfig = {
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Account',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  }
};

const StackConfig = {};

const AccountStackNavigator = createStackNavigator(RouteConfig, StackConfig);

export default AccountStackNavigator;
