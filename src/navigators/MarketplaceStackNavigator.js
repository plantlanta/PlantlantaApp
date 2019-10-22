import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import CreateRewardScreen from '../screens/CreateRewardScreen';

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
  },
  CreateRewardScreen: {
    screen: CreateRewardScreen,
    navigationOptions: { title: 'Create New Reward' }
  }
};

const StackConfig = {};

const MarketplaceStackNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default MarketplaceStackNavigator;
