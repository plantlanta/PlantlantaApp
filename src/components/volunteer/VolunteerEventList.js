import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { API, graphqlOperation } from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#000'
  }
});

const query = `query ListEvents(
        $filter: ModelEventFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            organization
            rewardPointValue
            maxVolunteers
            volunteers
            startDate
            endDate
          }
          nextToken
        }
      }
      `;

// const filter = {
//   endDate: {
//     ge: new Date()
//   }
// };

const Item = ({
  id,
  name,
  organization,
  rewardPointValue,
  maxVolunteers,
  volunteers,
  startDate,
  endDate
}) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(`pressed ${id}`);
        navigate('EventDetailScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{name}</Text>
      <Text style={styles.textStyle}>{organization}</Text>
      <Text style={styles.textStyle}>
        {`Reward Points: ${rewardPointValue}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Volunteers: ${volunteers ? volunteers.length : 0}/${maxVolunteers}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Starts: ${new Date(startDate).toDateString()}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Ends: ${new Date(endDate).toDateString()}`}
      </Text>
    </TouchableOpacity>
  );
};

const VolunteerEventList = () => {
  const [events, setEvents] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query)).then(res => {
        // console.log(res);
        setEvents(res.data.listEvents.items);
        setRefreshing(false);
      });
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={events}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            organization={item.organization}
            rewardPointValue={item.rewardPointValue}
            maxVolunteers={item.maxVolunteers}
            volunteers={item.volunteers}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CED0CE'
            }}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={loadEvents}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default VolunteerEventList;
