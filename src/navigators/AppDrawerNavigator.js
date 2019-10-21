import { createDrawerNavigator } from 'react-navigation-drawer';
import EventStackNavigator from './EventStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import MarketplaceStackNavigator from './MarketplaceStackNavigator';

const RouteConfig = {
  Events: { screen: EventStackNavigator },
  Account: { screen: AccountStackNavigator },
  Settings: { screen: SettingsStackNavigator },
  Rewards: { screen: MarketplaceStackNavigator }
};

const DrawerConfig = {};
const AppDrawerNavigator = createDrawerNavigator(RouteConfig, DrawerConfig);

export default AppDrawerNavigator;
