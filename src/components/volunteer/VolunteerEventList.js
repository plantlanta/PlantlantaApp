import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import EventList from '../EventList';

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

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const { navigate } = useNavigation();
        const { id } = item;
        console.log(`pressed ${item.id}`);
        navigate('EventDetailScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{item.name}</Text>
      <Text style={styles.textStyle}>{item.organization}</Text>
      <Text style={styles.textStyle}>
        {`Reward Points: ${item.rewardPointValue}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Volunteers: ${item.volunteers ? item.volunteers.length : 0}/${
          item.maxVolunteers
        }`}
      </Text>
      <Text style={styles.textStyle}>
        {`Starts: ${new Date(item.startDate).toDateString()}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Ends: ${new Date(item.endDate).toDateString()}`}
      </Text>
    </TouchableOpacity>
  );
};

const VolunteerEventList = () => {
  return (
    <SafeAreaView style={styles.container}>
      {EventList(renderItem, query)}
    </SafeAreaView>
  );
};

export default VolunteerEventList;
