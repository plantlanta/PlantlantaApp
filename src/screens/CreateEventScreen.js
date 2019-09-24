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
  Button,
  ScrollView,
} from 'react-native';
import { Container, Item, Input, DatePicker } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Auth from '@aws-amplify/auth';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const today = new Date();
today.setDate(today.getDate() + 57);
const newDay = new Date();
newDay.setDate(newDay.getDate() + 59);
const event_details = {
  name: 'test',
  description: 'test',
  address: '2659 test',
  organization: 'ttest',
  coordinator: 'tes',
  coordinatorPhone: '7703301090',
  coordinatorEmail: 'yourbuddayaj@gmail.com',
  rewardPointValue: 3,
  minVolunteers: 1,
  maxVolunteers: 2,
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
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
                    onSubmitEditing={() => {
                      secondInput.current._root.focus();
                    }}
                    onChangeText={text => setMaxVolunteers(text)}
                  />
                </Item>
                {/* Start Date section Use Date-Picker */}
                <Item>
                  <Text style={styles.textStyle}>{`Start Date: ${new Date(
                    startDate
                  ).toDateString()}`}</Text>
                  <DatePicker
                    defaultDate={new Date(2019, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2025, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={date => setStartDate(date)}
                    disabled={false}
                  />
                </Item>
                {/* End Date section  */}
                <Item>
                  <Text style={styles.textStyle}>{`End Date: ${new Date(
                    endDate
                  ).toDateString()}`}</Text>
                  <DatePicker
                    defaultDate={new Date(2019, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2025, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={date => setEndDate(date)}
                    disabled={false}
                  />
                </Item>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
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
                    createEvent();
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


createEvent = async () => {
  const event = await API.graphql(
    graphqlOperation(mutations.createEvent, { input: event_details })
  );
  console.log(event);
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
