import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import AppDrawerNavigator from './src/navigators/AppDrawerNavigator';

Amplify.configure(awsconfig);

export default createAppContainer(
  createSwitchNavigator({
    Authloading: { screen: AuthLoadingScreen },
    Auth: { screen: AuthStackNavigator },
    App: { screen: AppDrawerNavigator }
  })
);
