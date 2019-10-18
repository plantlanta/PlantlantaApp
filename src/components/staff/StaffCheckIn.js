import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

const StaffCheckIn = () => {
  const eventId = useNavigationParam('id');
  const [event, setEvent] = useState();
  const [volunteers, setVolunteers] = useState([]);
  const [eventPoints, setEventPoints] = useState();
  const [currUser, setCurrUser] = useState();
  const [eventLoaded, setEventLoaded] = useState(false);
  const volunteerData = [];

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id: eventId
      })
    ).then(res => {
      setEvent(res.data.getEvent);
      setEventLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (eventLoaded) {
      console.log(event);

      event.volunteers.forEach(id => {
        API.graphql(
          graphqlOperation(queries.getUser, {
            id
          })
        ).then(res => {
          // setCurrUser(res.data.getUser.name)
          // addVolunteer(res.data.getUser)
          console.log(res);
          setVolunteers(old => [...old, res.data.getUser]);
          // var newList = volunteers.concat({id: id, name: res.data.getUser.name,});
          // setVolunteers(newList)
        });
      });
      // setVolunteers(volunteerData)
    }
  }, [eventLoaded]);

  const checkin = item => {
    const input = item;
    if (!input.eventHistory.includes(event.id)) {
      input.rewardPoints += event.rewardPointValue;
      input.eventHistory.push(event.id);
      API.graphql(graphqlOperation(mutations.updateUser, { input })).then(
        res => {
          console.log(res);
        }
      );
    } else {
      console.log('already checked in');
    }
  };

  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => checkin(item)}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  ) : null;
};

export default StaffCheckIn;
