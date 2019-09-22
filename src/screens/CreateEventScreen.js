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
              {/* Event Name section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Event Name"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'default'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/*  Event Description section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Event Description"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'default'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  ref={secondInput}
                  onSubmitEditing={() => {
                    thirdInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Event Address section */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Event Address"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'default'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  ref={thirdInput}
                />
              </Item>
              {/* Event Organization section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Organization"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'default'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Coordinator section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Coordinator"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'default'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Coordinator Phone section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Coordinator Phone Number"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'phone-pad'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Coordinator Email section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Coordinator Email"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Reward Point Value section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Reward Point Value"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'number-pad'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Min Volunteers section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Minimum Volunteers"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'number-pad'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Max Volunteers section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Maximum Volunteers"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'number-pad'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* Start Date section Use Date-Picker */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="Start Date"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'numeric'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
              {/* End Date section  */}
              <Item style={styles.itemStyle}>
                <Input
                  style={styles.input}
                  placeholder="End Date"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'numeric'}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                />
              </Item>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
});
