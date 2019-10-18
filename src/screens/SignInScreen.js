import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import { Auth } from 'aws-amplify';

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
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  itemStyle: {
    marginBottom: 20
  },
  iconStyle: {
    color: '#fff',
    fontSize: 30,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 14,
    marginBottom: 20,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

const SignInScreen = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const secondInput = useRef();

  const signIn = async () => {
    await Auth.signIn(email, password)
      .then(() => {
        navigate('Authloading');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when signing in: ', err);
          Alert.alert('Error when signing in: ', err);
        } else {
          console.log('Error when signing in: ', err.message);
          Alert.alert('Error when signing in: ', err.message);
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
              <Item style={styles.itemStyle}>
                <Icon name="ios-person" style={styles.iconStyle} />
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
              <Item style={styles.itemStyle}>
                <Icon name="ios-lock" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#adb4bc"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  ref={secondInput}
                  onChangeText={value => setPassword(value)}
                />
              </Item>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() => {
                    signIn();
                  }}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate('SignUp')}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigate('ForgetPassword')}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Forget password ?</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
