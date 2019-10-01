import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Auth from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    };
  }

  async componentDidMount() {
    await this.loadApp();
  }

  async loadApp() {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userToken: user.signInUserSession.accessToken.jwtToken
        });
      })
      .catch(err => console.log(err));
    const { userToken } = this.state;
    const { navigation } = this.props;
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
