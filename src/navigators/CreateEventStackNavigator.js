import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
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
            <Icon name="md-menu" size={26} />
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
