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
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 27 }}>Create An Account</Text>
          </View>

          <View style={styles.getStartedContainer}>
            <TextInput
              style={{height: 40, width: 325, marginTop: 10, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={"First Name"}
              />
            <TextInput
              style={{height: 40, width: 325, marginTop: 10, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={"Last Name"}
              />
           <TextInput
             style={{height: 40, width: 325, marginTop: 10, marginBottom: 10, borderColor: 'gray', borderWidth: 1}}
             onChangeText={(text) => this.setState({text})}
             value={"Username"}
             />
           <TextInput
             style={{height: 40, width: 325, borderColor: 'gray', borderWidth: 1}}
             onChangeText={(text) => this.setState({text})}
             value={"Password"}
             />
           <TextInput
             style={{height: 40, width: 325, marginTop: 10, marginBottom: 10, borderColor: 'gray', borderWidth: 1}}
             onChangeText={(text) => this.setState({text})}
             value={"Confirm Password"}
             />
            <Text>By registering you are agreeing to our Terms and Conditions</Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
              <Text style={styles.registerButton}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 500,
    height: 215,
    marginTop: 6,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  registerButton: {
    fontSize: 14,
    backgroundColor: '#1E960F',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
