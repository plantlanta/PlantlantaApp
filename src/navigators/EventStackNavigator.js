import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import EventListScreen from '../screens/EventListScreen';
import EventDetailScreen from '../screens/EventDetail';

const routeConfigMap = {
  EventList: {
    screen: EventListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event List',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  EventDetail: {
    screen: EventDetailScreen,
    navigationOptions: { title: 'Event Detail' }
  }
};

const StackConfig = {};

const EventNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default EventNavigator;
