import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const event1 = {
  eventId: 'qwehqwficqwi',
  eventName: 'Event1',
  eventDescription: 'sample event',
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
          createEvent();
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
