import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Auth, API, graphqlOperation } from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const getUserApproved = `query GetUser($id: ID!) {
  getUser(id: $id) {
    adminApproved
  }
}
`;

const AuthLoadingScreen = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        // console.log(user);
        if (user.username) {
          API.graphql(
            graphqlOperation(getUserApproved, {
              id: user.username
            })
          )
            .then(res => {
              // console.log(res);
              if (res.data.getUser.adminApproved) {
                navigate('App');
              } else {
                Alert.alert(
                  'Your account has not been approved by an Admin yet.'
                );
                navigate('Auth');
              }
            })
            .catch(err => {
              console.log(err);
              console.log(
                'Assuming Graphql and Appsync are setup correctly then the DyanmoDB User entry not found.'
              );
              navigate('Auth');
            });
        } else {
          navigate('Auth');
        }
      })
      .catch(err => {
        console.log(err);
        navigate('Auth');
      });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default AuthLoadingScreen;
