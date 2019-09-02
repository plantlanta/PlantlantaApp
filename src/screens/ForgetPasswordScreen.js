import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Text,
} from 'react-native';
import { Container, Item, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Auth from '@aws-amplify/auth';
import { useNavigation } from 'react-navigation-hooks';

export default ForgetPasswordScreen = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const secondInput = useRef();

  forgotPassword = async () => {
    await Auth.forgotPassword(email)
      .then(data => console.log('New code sent', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error while setting up the new password: ', err);
          Alert.alert('Error while setting up the new password: ', err);
        } else {
          console.log('Error while setting up the new password: ', err.message);
          Alert.alert('Error while setting up the new password: ', err.message);
        }
      });
  };

  forgotPasswordSubmit = async () => {
    await Auth.forgotPasswordSubmit(email, authCode, newPassword)
      .then(() => {
        navigate('SignIn');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error while confirming the new password: ', err);
          Alert.alert('Error while confirming the new password: ', err);
        } else {
          console.log('Error while confirming the new password: ', err.message);
          Alert.alert('Error while confirming the new password: ', err.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={23}
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          {/* Infos */}
          <Container style={styles.infoContainer}>
            <View style={styles.container}>
              {/* Username */}
              <Item style={styles.itemStyle}>
                <Ionicons name="ios-person" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={value => setEmail(value)}
                />
              </Item>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => forgotPassword()}
              >
                <Text style={styles.buttonText}>Send Code</Text>
              </TouchableOpacity>
              {/* the New password section  */}
              <Item style={styles.itemStyle}>
                <Ionicons name="ios-lock" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="New password"
                  placeholderTextColor="#adb4bc"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onSubmitEditing={() => {
                    secondInput.current._root.focus();
                  }}
                  onChangeText={value => setNewPassword(value)}
                />
              </Item>
              {/* Code confirmation section  */}
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
                  ref={secondInput}
                  onChangeText={value => setAuthCode(value)}
                />
              </Item>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => forgotPasswordSubmit()}
              >
                <Text style={styles.buttonText}>Confirm the new password</Text>
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
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#1faa00',
    fontSize: 28,
    marginLeft: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 14,
    marginBottom: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
