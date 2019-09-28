import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import CreateEventScreen from '../screens/CreateEventScreen';

const RouteConfig = {
  CreateEvent: {
    screen: CreateEventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create New Event',
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

const CreateEventStackNavigator = createStackNavigator(
  RouteConfig,
  StackConfig
);

export default CreateEventStackNavigator;
