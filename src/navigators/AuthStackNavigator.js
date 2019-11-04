import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';

const routeConfigMap = {
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
      headerBackTitle: 'Back'
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`
    })
  }
};

const AuthStackNavigator = createStackNavigator(routeConfigMap);

export default AuthStackNavigator;
