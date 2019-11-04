import { createDrawerNavigator } from 'react-navigation-drawer';
import { Auth } from 'aws-amplify';
import EventStackNavigator from './EventStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import MarketplaceStackNavigator from './MarketplaceStackNavigator';
import AccountType from '../components/AccountType';
import CustomDrawerContent from '../components/CustomDrawerContent';

const RouteConfig = () => {
  // const accountType = Auth.currentAuthenticatedUser().then(user => {
  //   return user.attributes['custom:accountType'];
  // });
  const config = {
    Events: { screen: EventStackNavigator },
    Account: { screen: AccountStackNavigator },
    Settings: { screen: SettingsStackNavigator },
    Rewards: { screen: MarketplaceStackNavigator }
  };
  // if (accountType === 'volunteer') {
  //   config = {
  //     ...config,
  //     Rewards: { screen: MarketplaceStackNavigator }
  //   };
  // }
  // if (accountType === 'staff') {
  //   config = {
  //     ...config
  //   };
  // }
  // if (accountType === 'staff') {
  //   config = {
  //     ...config,
  //     Rewards: { screen: MarketplaceStackNavigator }
  //   };
  // }
  return config;
};

const DrawerConfig = { contentComponent: CustomDrawerContent };
const AppDrawerNavigator = createDrawerNavigator(RouteConfig(), DrawerConfig);

export default AppDrawerNavigator;
