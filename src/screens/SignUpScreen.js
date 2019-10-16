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
  Picker,
} from 'react-native';
import { Container, Item, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Auth from '@aws-amplify/auth';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

export default SignUpScreen = props => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [authCode, setAuthcode] = useState('');
  const secondInput = useRef();
  const thirdInput = useRef();

  signUp = async () => {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: { 'name': name, 'custom:accountType': accountType }
    })
      .then((res) => {
        console.log(res.userSub)
        createUser(res.userSub)
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

  const createUser = (id) => {
    const input = {
      id: id,
      name: name,
      email: email,
      accountType: accountType,
      rewardPoints: 0,
      eventHistory: []
    }
    API.graphql(graphqlOperation(mutations.createUser, { input })).then(
      newUser => {
        console.log(newUser);
      }
    );
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
              <Picker
                selectedValue={accountType}
                mode='dropdown'
                // style={{height: 50, width: 100}}
                onValueChange={(itemValue) =>
                  setAccountType(itemValue)
                }>
                <Picker.Item label="" value=""/>
                <Picker.Item label="Volunteer" value="volunteer" />
                <Picker.Item label="Staff" value="staff" />
              </Picker>
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
