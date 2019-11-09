import { createDrawerNavigator } from 'react-navigation-drawer';
import EventStackNavigator from './EventStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import MarketplaceStackNavigator from './MarketplaceStackNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import UserStackNavigator from './UserStackNavigator';

const RouteConfig = {
  Events: { screen: EventStackNavigator },
  Users: { screen: UserStackNavigator },
  Rewards: { screen: MarketplaceStackNavigator },
  Account: { screen: AccountStackNavigator },
  Settings: { screen: SettingsStackNavigator }
};

const DrawerConfig = { contentComponent: CustomDrawerContent };
const AppDrawerNavigator = createDrawerNavigator(RouteConfig, DrawerConfig);

export default AppDrawerNavigator;
