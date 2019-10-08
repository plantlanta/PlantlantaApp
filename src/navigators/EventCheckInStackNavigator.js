import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import EventCheckIn from '../screens/EventCheckIn';
import CheckInScreen from '../screens/CheckInScreen';

const routeConfigMap = {
  CheckIn: {
    screen: EventCheckIn,
    navigationOptions: ({ navigation }) => ({
      title: 'Event Check In',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  EventDetail: {
    screen: CheckInScreen,
    navigationOptions: { title: 'Event Detail' }
  }
};

const StackConfig = {};

const EventCheckInStackNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default EventCheckInStackNavigator;
