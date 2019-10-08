import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Body,
  Content,
  CardItem,
  Button,
  Left,
  Right
} from 'native-base';
import { FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


const CheckInScreen = () => {
  const [event, setEvent] = useState();
  const [volunteers, setVolunteers] = useState();
  const id = useNavigationParam('id');

  const loadEvent = () => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id
      })
    ).then(res => {
      setEvent(res.data.getEvent);
      loadVolunteers(res.data.getEvent)
    });
  };

  const loadVolunteers = (event) => {
    var volunteerData = []
    event.volunteers.forEach(volunteer => {
      volunteerData.push({key: volunteer,})
    });
    setVolunteers(volunteerData)

  }

  useEffect(() => {
    loadEvent();
  }, []);



  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </SafeAreaView>
  ) : null;
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
