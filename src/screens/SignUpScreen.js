<<<<<<< Updated upstream
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
=======
import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { Container, Item, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Auth from '@aws-amplify/auth';

export default SignUpScreen = props => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authCode, setAuthcode] = useState('');
  const secondInput = useRef();
  const thirdInput = useRef();

  signUp = async () => {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: { name },
    })
      .then(() => {
        console.log('sign up successful!');
        Alert.alert('Enter the confirmation code you recieved');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when signing up: ', err);
          Alert.alert('Error when signing up: ', err);
        } else {
          console.log('Error when signing up: ', err.message);
          Alert.alert('Error when signing up: ', err.message);
        }
      });
  };

  confirmSignUp = async () => {
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        navigate('SignIn');
        console.log('Confirm sign up successful');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when entering confirmation code: ', err);
          Alert.alert('Error when entering confirmation code: ', err);
        } else {
          console.log('Error when entering confirmation code: ', err.message);
          Alert.alert('Error when entering confirmation code: ', err.message);
        }
      });
  };

  resendSignUp = async () => {
    await Auth.resendSignUp(email)
      .then(() => console.log('Confirmation code resent successfully'))
      .catch(err => {
        if (!err.message) {
          console.log('Error requesting new confirmation code: ', err);
          Alert.alert('Error requesting new confirmation code: ', err);
        } else {
          console.log('Error requesting new confirmation code: ', err.message);
          Alert.alert('Error requesting new confirmation code: ', err.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <Container style={styles.infoContainer}>
            <View style={styles.container}>
              {/* email section  */}
              <Item style={styles.itemStyle}>
                <Ionicons name="ios-mail" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                  onChangeText={value => setEmail(value)}
                />
              </Item>
              {/*  password section  */}
              <Item style={styles.itemStyle}>
                <Ionicons name="ios-lock" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#adb4bc"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  ref={secondInput}
                  onSubmitEditing={() => {
                    thirdInput.current._root.focus();
                  }}
                  onChangeText={value => setPassword(value)}
                />
              </Item>
              {/* name section */}
              <Item style={styles.itemStyle}>
                <Ionicons name="ios-person" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  ref={thirdInput}
                  onChangeText={value => setName(value)}
                />
              </Item>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => signUp()}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              {/* code confirmation section  */}
              <Item style={styles.itemStyle}>
                <Ionicons name="md-apps" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Confirmation code"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'numeric'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  onChangeText={value => setAuthcode(value)}
                />
              </Item>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={confirmSignUp}
              >
                <Text style={styles.buttonText}>Confirm Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={resendSignUp}
              >
                <Text style={styles.buttonText}>Resend code</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
>>>>>>> Stashed changes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
<<<<<<< Updated upstream
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
=======
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  itemStyle: {
    marginBottom: 10,
  },
  iconStyle: {
    color: '#1faa00',
    fontSize: 28,
    marginRight: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
>>>>>>> Stashed changes
  },
});
