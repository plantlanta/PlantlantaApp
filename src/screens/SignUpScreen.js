import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import CheckBox from 'react-native-check-box'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';


export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    }
  }


  render () {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Create An Account</Text>
        <TextInput placeholder="First Name" />
        <TextInput placeholder="Last Name" />
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" />
        <TextInput placeholder="Confirm Password" />
        <View style={{ margin: 7 }} />
        <Button onPress={null} title="Register" />
        <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>{
              this.setState({
                  isChecked:!this.state.isChecked
              })
            }}
            isChecked={this.state.isChecked}
            rightText={"test"}
        />
        <Text
          style={{ color: "blue" }}
          onPress={this._navigateToRegister}
          Register
        />
      </View>
    );
  }
}

// RegistrationScreen.navigationOptions = {
//   title: 'Registration',
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
