import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import CreateRewardScreen from '../screens/CreateRewardScreen';
import RewardDetailScreen from '../screens/RewardDetailScreen';
import EditRewardScreen from '../screens/EditRewardScreen';

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
  },
  RewardDetailScreen: {
    screen: RewardDetailScreen,
    navigationOptions: { title: 'Reward Detail' }
  },
  EditRewardScreen: {
    screen: EditRewardScreen,
    navigationOptions: { title: 'Edit Reward' }
  }
};

const StackConfig = {};

const MarketplaceStackNavigator = createStackNavigator(
  routeConfigMap,
  StackConfig
);

export default MarketplaceStackNavigator;
