import { createDrawerNavigator } from 'react-navigation-drawer';
import EventStackNavigator from './EventStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import CreateEventStackNavigator from './CreateEventStackNavigator';

const RouteConfig = {
  Events: { screen: EventStackNavigator },
  Account: { screen: AccountStackNavigator },
  Settings: { screen: SettingsStackNavigator },
  CreateEvent: { screen: CreateEventStackNavigator }
};

const DrawerConfig = {};
const AppDrawerNavigator = createDrawerNavigator(RouteConfig, DrawerConfig);

export default AppDrawerNavigator;
