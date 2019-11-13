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

const StaffCheckIn = () => {
  const eventId = useNavigationParam('id');
  const [event, setEvent] = useState();
  const [volunteers, setVolunteers] = useState([]);
  const [eventPoints, setEventPoints] = useState();
  const [currUser, setCurrUser] = useState();
  const [eventLoaded, setEventLoaded] = useState(false);
  const volunteerData = [];
  var checkedIn = [];
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
    var inEvent = false;
    input.eventHistory.forEach(entry => {
      if (entry.id == event.id && entry.timeIn != null) {
        inEvent = true;
        return;
      }
    });
    if (inEvent) {
      Alert.alert(
        'Error!',
        'This user is already checked in!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: false }
      );
    } else {
      const currDate = new Date();
      console.log(currDate);
      const newUserEvent = {
        id: event.id,
        name: event.name,
        timeIn: currDate,
        timeOut: null
      }
      input.eventHistory.push(newUserEvent);
      API.graphql(graphqlOperation(mutations.updateUser, { input })).then(
        res => {
          console.log(res);
        }
      );
    }
    
  };

  return event ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={volunteers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => checkin(item)}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Fab
          position="bottomRight"
          style={{ backgroundColor: '#64dd17' }}
          onPress={() => {
            navigate('CheckOutScreen', {id: eventId});
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 10 }}>Check Out</Text>
        </Fab>
    </SafeAreaView>
  ) : null;
};

export default StaffCheckIn;
