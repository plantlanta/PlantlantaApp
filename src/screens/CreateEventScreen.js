import React, { useState, useRef } from 'react';
import {
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Container, Item, Input, DatePicker } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const today = new Date();
today.setDate(today.getDate());
const newDay = new Date();
newDay.setDate(newDay.getDate() + 59);
const event_details = {
  name: '',
  description: '',
  address: '',
  organization: '',
  coordinator: '',
  coordinatorPhone: '',
  coordinatorEmail: '',
  rewardPointValue: 0,
  minVolunteers: 1,
  maxVolunteers: 1,
  volunteers: [],
  startDate: today,
  endDate: newDay,
};

createEvent = async () => {
  const event = await API.graphql(
    graphqlOperation(mutations.createEvent, { input: event_details })
  );
  console.log(event);
};

export default CreateEventScreen = props => {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [coordinatorPhone, setCoordinatorPhone] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [minVolunteers, setMinVolunteers] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');
  const [rewardPointValue, setRewardPointValue] = useState('');
  const [volunteers, setVolunteers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [org, setOrg] = useState('');
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const seventhInput = useRef();
  const eigthInput = useRef();
  const ninthInput = useRef();
  const tenthInput = useRef();
  const eleventhInput = useRef();
  const twelfthInput = useRef();

  setBothDates = (date) => {
    setStartDate(date);
    setEndDate(date);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar />
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* Event Name section    */}
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
                    onChangeText={text => setName(text)}
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
                    ref={secondInput}
                    onSubmitEditing={() => {
                      thirdInput.current._root.focus();
                    }}
                    onChangeText={text => setDescription(text)}
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
                    onSubmitEditing={() => {
                      fourthInput.current._root.focus();
                    }}
                    onChangeText={text => setAddress(text)}
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
                    ref={fourthInput}
                    onSubmitEditing={() => {
                      fifthInput.current._root.focus();
                    }}
                    onChangeText={text => setOrg(text)}
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
                    ref={fifthInput}
                    onSubmitEditing={() => {
                      sixthInput.current._root.focus();
                    }}
                    onChangeText={text => setCoordinator(text)}
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
                    ref={sixthInput}
                    onSubmitEditing={() => {
                      seventhInput.current._root.focus();
                    }}
                    onChangeText={text => setCoordinatorPhone(text)}
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
                    ref={seventhInput}
                    onSubmitEditing={() => {
                      eigthInput.current._root.focus();
                    }}
                    onChangeText={text => setCoordinatorEmail(text)}
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
                    ref={eigthInput}
                    onSubmitEditing={() => {
                      ninthInput.current._root.focus();
                    }}
                    onChangeText={text => setRewardPointValue(text)}
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
                    ref={ninthInput}
                    onSubmitEditing={() => {
                      tenthInput.current._root.focus();
                    }}
                    onChangeText={text => setMinVolunteers(text)}
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
                    ref={tenthInput}
                    onSubmitEditing={() => {
                      eleventhInput.current._root.focus();
                    }}
                    onChangeText={text => setMaxVolunteers(text)}
                  />
                </Item>
                {/* Start Date section Use Date-Picker */}
                <Item>
                  <Text style={styles.textStyle}>{`Start Date: `}</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(9999, 12, 31)}
                    locale={"en-US"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={date => setBothDates(date)}
                    disabled={false}
                    ref={eleventhInput}
                    onSubmitEditing={() => {
                      twelfthInput.current._root.focus();
                    }}
                  />
                </Item>
                {/* End Date section  */}
                <Item>
                  <Text style={styles.textStyle}>{`End Date: `}</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={startDate}
                    maximumDate={new Date(9999, 12, 31)}
                    locale={"en-US"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={date => setEndDate(date)}
                    disabled={false}
                    ref={twelfthInput}
                  />
                </Item>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    var create = false;
                    event_details.name = name
                    event_details.description = description
                    event_details.address = address
                    event_details.organization = org
                    event_details.coordinator = coordinator
                    event_details.coordinatorPhone = coordinatorPhone
                    event_details.coordinatorEmail = coordinatorEmail
                    event_details.rewardPointValue = rewardPointValue
                    event_details.minVolunteers = minVolunteers
                    event_details.maxVolunteers = maxVolunteers
                    //event_details.volunteers = volunteers
                    event_details.startDate = startDate
                    event_details.endDate = endDate
                    //console.log(event_details)
                    if (event_details.name == '') {
                      Alert.alert(
                        'Error',
                        'The event must have a name.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else if (event_details.address == '') {
                      Alert.alert(
                        'Error',
                        'The event must have a address/location.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else if (event_details.organization == '') {
                      Alert.alert(
                        'Error',
                        'The event must have an organizer.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else if (event_details.coordinatorPhone == '') {
                      Alert.alert(
                        'Error',
                        'The event must have a valid phone number for contact.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else if (event_details.coordinatorEmail == '') {
                      Alert.alert(
                        'Error',
                        'The event must have a valid email address for contact.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else if (event_details.rewardPointValue == 0) {
                      Alert.alert(
                        'Error',
                        'The event must have a reward value of at least 1..',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    } else {
                      create = true;
                    }
                    if (create) {
                      createEvent();
                      Alert.alert(
                        'Success!',
                        'Your event has been created!',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
              </View>
            </Container>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
