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
  Picker
} from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff'
  },
  itemStyle: {
    marginBottom: 10
  },
  iconStyle: {
    color: '#1faa00',
    fontSize: 28,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});

const SignUpScreen = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('volunteer');
  const [authCode, setAuthcode] = useState('');
  const secondInput = useRef();
  const thirdInput = useRef();

  const createUser = id => {
    const input = {
      id,
      name,
      email,
      accountType,
      rewardPoints: 0,
      rewardHistory: [],
      eventHistory: [],
      adminApproved: accountType === 'volunteer'
    };
    // API.graphql({
    //   query: mutations.createUser,
    //   variables: { input },
    //   authMode: 'AWS_IAM'
    // })
    API.graphql(graphqlOperation(mutations.createUser, { input }))
      .then(newUser => {
        console.log(newUser);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const signUp = async () => {
    // Auth.currentCredentials()
    //   .then(d => console.log('data: ', d))
    //   .catch(e => console.log('error: ', e));
    await Auth.signUp({
      username: email,
      password,
      attributes: { name, 'custom:accountType': accountType }
    })
      .then(res => {
        console.log(res.userSub);
        createUser(res.userSub);
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

  const confirmSignUp = async () => {
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

  const resendSignUp = async () => {
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
                <Icon name="ios-mail" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#adb4bc"
                  keyboardType="email-address"
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
                <Icon name="ios-lock" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#adb4bc"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  ref={secondInput}
                  onSubmitEditing={() => {
                    thirdInput.current._root.focus();
                  }}
                  onChangeText={value => setPassword(value)}
                />
              </Item>
              {/* name section */}
              <Item style={styles.itemStyle}>
                <Icon name="ios-person" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#adb4bc"
                  keyboardType="email-address"
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
                mode="dropdown"
                // style={{height: 50, width: 100}}
                onValueChange={itemValue => setAccountType(itemValue)}
              >
                <Picker.Item label="Volunteer" value="volunteer" />
                <Picker.Item label="Staff" value="staff" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => signUp()}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              {/* code confirmation section  */}
              <Item style={styles.itemStyle}>
                <Icon name="md-apps" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Confirmation code"
                  placeholderTextColor="#adb4bc"
                  keyboardType="numeric"
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

export default SignUpScreen;
