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
  const id = useNavigationParam('id');

  const loadEvent = () => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id
      })
    ).then(res => {
      setEvent(res.data.getEvent);
      loadVolunteers(res.data.getEvent)
      setRewardPointValue(event.rewardPointValue)
    });
  };

  const loadVolunteers = (event) => {
    var volunteerData = []
    event.volunteers.forEach(volunteer => {
      // API.graphql(
      //   graphqlOperation(queries.getUser, {
      //     volunteer
      //   })
      // ).then(res => {
      //   console.log(res)
      // })
      volunteerData.push({key: volunteer,})
    });
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
      console.log(res)
    })
  }


  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({item}) =>
          <TouchableOpacity onPress={checkin(item.key)}>
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
