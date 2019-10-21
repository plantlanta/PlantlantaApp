import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import MarketplaceScreen from '../screens/MarketplaceScreen';

const routeConfigMap = {
  MarketplaceScreen: {
    screen: MarketplaceScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Market',
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

const EventStackNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default EventStackNavigator;
