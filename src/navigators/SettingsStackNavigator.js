import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';

const RouteConfig = {
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
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

const SettingsStackNavigator = createStackNavigator(RouteConfig, StackConfig);

export default SettingsStackNavigator;
