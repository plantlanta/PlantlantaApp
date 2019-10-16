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
import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


const CheckInScreen = () => {
  const [event, setEvent] = useState();
  const [volunteers, setVolunteers] = useState();
  const [eventPoints, setEventPoints] = useState();
  const [currUser, setCurrUser] = useState();
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
    console.log(event.volunteers)
    event.volunteers.forEach(id => {
      API.graphql(
        graphqlOperation(queries.getUser, {
          id
        })
      ).then(res => {
        // setCurrUser(res.data.getUser.name)
        console.log(res)
        volunteerData.push({id: id, name: res.data.getUser.name})
      })
    });
    console.log(volunterData)
    setVolunteers(volunteerData)
  }

  useEffect(() => {
    loadEvent();
  }, []);

  const checkin = (id) => {
    API.graphql(
      graphqlOperation(queries.getUser, {
        id
      })
    ).then(res => {
      console.log(res.data.getUser)
    })
  }


  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({item}) =>
          <TouchableOpacity onPress={checkin(item.id)}>
            <View style={{ paddingHorizontal: 10, paddingVertical:10 }}>
              <Text>{item.key}</Text>
            </View>
          </TouchableOpacity>}
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
