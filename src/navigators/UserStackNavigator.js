import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import AdminUserListScreen from '../screens/AdminUserListScreen';
import AdminUserDetailScreen from '../screens/AdminUserDetailScreen';

const routeConfigMap = {
  AdminUserListScreen: {
    screen: AdminUserListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Unapproved User List',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={26} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  AdminUserDetailScreen: {
    screen: AdminUserDetailScreen,
    navigationOptions: { title: 'User Detail' }
  }
};

const StackConfig = {};

const UserStackNavigator = createStackNavigator(routeConfigMap, StackConfig);

export default UserStackNavigator;
