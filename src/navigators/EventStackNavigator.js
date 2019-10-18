import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import EventListScreen from '../screens/EventListScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const routeConfigMap = {
  EventList: {
    screen: EventListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event List',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
    navigationOptions: { title: 'Event Detail' }
  }
};

const StackConfig = {};

const EventStackNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default EventStackNavigator;
