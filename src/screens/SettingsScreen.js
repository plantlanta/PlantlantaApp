import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import Auth from '@aws-amplify/auth';

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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff'
  },
  itemStyle: {
    marginTop: 20
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
    marginTop: 20,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});

const ScreenName = () => {
  const { navigate } = useNavigation();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const inputRef = useRef(null);

  const changePassword = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, password1, password2);
      })
      .then(data => console.log('Password changed successfully', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error changing password: ', err);
          Alert.alert('Error changing password: ', err);
        } else {
          console.log('Error changing password: ', err.message);
          Alert.alert('Error changing password: ', err.message);
        }
      });
  };

  const signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        navigate('Authloading');
      })
      .catch(err => console.log('Error while signing out!', err));
  };

  const signOutAlert = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            signOut();
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            {/* Infos */}
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                <View
                  style={[
                    styles.buttonStyle,
                    { borderRadius: 4, marginBottom: 20 }
                  ]}
                >
                  <Text style={styles.buttonText}>Change password</Text>
                </View>
                {/* Old password */}
                <Item style={styles.itemStyle}>
                  <Icon name="ios-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Old password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    onSubmitEditing={() => {
                      inputRef.current.focus();
                    }}
                    onChangeText={value => setPassword1(value)}
                  />
                </Item>
                {/* New password */}
                <Item style={styles.itemStyle}>
                  <Icon name="ios-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="New password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={inputRef}
                    onChangeText={value => setPassword2(value)}
                  />
                </Item>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={changePassword}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 100
                  }}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }
                  ]}
                  onPress={signOutAlert}
                >
                  <Icon
                    name="md-power"
                    style={{ color: '#000', marginRight: 10, fontSize: 24 }}
                  />
                  <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenName;
