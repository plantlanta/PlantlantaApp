import { createDrawerNavigator } from 'react-navigation-drawer';
import EventStackNavigator from './EventStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';

const RouteConfig = {
  Events: { screen: EventStackNavigator },
  Account: { screen: AccountStackNavigator },
  Settings: { screen: SettingsStackNavigator }
};

const DrawerConfig = {};
const AppDrawerNavigator = createDrawerNavigator(RouteConfig, DrawerConfig);

export default AppDrawerNavigator;
