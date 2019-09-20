import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

//TODO delete by end of sprint

const today = new Date();
today.setDate(today.getDate() + 57);
const newDay = new Date();
newDay.setDate(newDay.getDate() + 59);
const event1 = {
  name: 'event name 3',
  description: 'a description of the event',
  address: '123 fake street-fake city-fake state-fakezip',
  organization: 'org3',
  coordinator: 'coord3',
  coordinatorPhone: '404-402-9410',
  coordinatorEmail: 'fake3@notreal.com',
  rewardPointValue: 150,
  minVolunteers: 3,
  maxVolunteers: 10,
  volunteers: ['vol13', 'vol23', 'vol33', 'vol43', 'vol53'],
  startDate: today,
  endDate: newDay,
};

createEvent = async () => {
  const event = await API.graphql(
    graphqlOperation(mutations.createEvent, { input: event1 })
  );
  console.log(event);
};

export default HomeScreen = eventId => {
  return (
    <View style={styles.container}>
      <Button
        title="Click ME to create"
        onPress={() => {
          // createEvent();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#000',
  },
});
