import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { Fab } from 'native-base';
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
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

const StaffCheckOut = () => {
  const eventId = useNavigationParam('id');
  const [volunteers, setVolunteers] = useState([]);
  const [volunteersLoaded, setVolunteersLoaded] = useState(false);
  const [event, setEvent] = useState();
  const [eventLoaded, setEventLoaded] = useState(false);
  const { navigate } = useNavigation();

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
          console.log(res);
          setVolunteers(old => [...old, res.data.getUser]);
        });
      });
    }
  }, [eventLoaded]);

  const checkout = item => {
    const input = item;
    var inEvent = false;
    input.eventHistory.forEach(entry => {
      if (entry.id == eventId && entry.timeIn != null) {
        const ind = input.eventHistory.indexOf(entry);
        inEvent = true;
        var currEvent = entry;
        input.eventHistory.splice(ind, 1);
        currEvent.timeOut = new Date();
        input.eventHistory.push(currEvent);
        console.log(currEvent.timeIn);
        console.log(currEvent.timeOut);
        var totalPoints = (new Date(currEvent.timeOut) - new Date(currEvent.timeIn)) / 1000;
        totalPoints /= (60 * 60);
        totalPoints *= 10; //10 points per hour worked
        console.log(totalPoints)
        input.rewardPoints += Math.round(totalPoints);
        API.graphql(graphqlOperation(mutations.updateUser, { input })).then(
          res => {
            console.log(res);
          }
        );
        return;
      }
    });
    if (!inEvent) {
      
      Alert.alert(
        'Error!',
        'This user is not checked in!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Success!',
        'This user has been checked out!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: false }
      );
    }
    
  };

  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => checkout(item)}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  ) : null;
};

export default StaffCheckOut;
