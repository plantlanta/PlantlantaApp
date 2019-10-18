import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Auth } from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AuthLoadingScreen = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    Auth.currentSession()
      .then(data => {
        if (data.accessToken.jwtToken) {
          navigate('App');
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
