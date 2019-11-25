import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import AppDrawerNavigator from './src/navigators/AppDrawerNavigator';

Amplify.configure(awsconfig);
// Amplify.configure({
//   Auth: {
//     identityPoolId: awsconfig.aws_cognito_identity_pool_id, // REQUIRED - Amazon Cognito Identity Pool ID
//     region: awsconfig.aws_cognito_region, // REQUIRED - Amazon Cognito Region
//     userPoolId: awsconfig.aws_user_pools_id, // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: awsconfig.aws_user_pools_web_client_id // OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Storage: {
//     AWSS3: {
//       bucket: awsconfig.aws_user_files_s3_bucket, // REQUIRED -  Amazon S3 bucket
//       region: awsconfig.aws_user_files_s3_bucket_region // OPTIONAL -  Amazon service region
//     }
//   }
// });

export default createAppContainer(
  createSwitchNavigator({
    Authloading: { screen: AuthLoadingScreen },
    Auth: { screen: AuthStackNavigator },
    App: { screen: AppDrawerNavigator }
  })
);
