import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import EventListScreen from '../screens/EventListScreen';
import ProfileScreen from '../screens/AccountScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const configurations = {
  EventList: {
    screen: EventListScreen,
    navigationOptions: {
      tabBarlabel: 'Events',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-menu" />;
      }
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-person"
        />;
      }
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-settings"
        />;
      }
    }
  },
  CreateEvent: {
    screen: CreateEventScreen,
    navigationOptions: {
      tabBarLabel: 'Create Event',
      tabBarIcon: ({ tintColor }) => {
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-settings"
        />;
      }
    }
  }
};

const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff9',
    style: {
      backgroundColor: '#1faa00'
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 12
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
};

// App tabs located at the bottom of the screen
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

AppTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};
