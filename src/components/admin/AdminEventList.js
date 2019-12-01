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
import { Container } from 'native-base';

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
            startDate
            endDate
            adminApproved
          }
          nextToken
        }
      }
      `;

const unapprovedFilter = {
  adminApproved: {
    eq: false
  }
};

const Item = ({
  id,
  name,
  organization,
  startDate,
  endDate,
  adminApproved
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
        {`Starts: ${new Date(startDate).toDateString()}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Ends: ${new Date(endDate).toDateString()}`}
      </Text>
      <Text style={styles.textStyle}>
        {adminApproved ? 'Admin Approved: True' : 'Admin Approved: False'}
      </Text>
    </TouchableOpacity>
  );
};

const AdminEventList = () => {
  const [events, setEvents] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [nextToken, setNextToken] = useState();

  const loadAdditionalEvents = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query, { nextToken })).then(res => {
        setNextToken(res.data.listEvents.nextToken);
        setEvents([...events, ...res.data.listEvents.items]);
        setRefreshing(false);
      });
    }
  };

  const loadEvents = filter => {
    if (!refreshing) {
      setRefreshing(true);
      if (filter) {
        API.graphql(graphqlOperation(query, filter)).then(res => {
          setEvents(res.data.listEvents.items);
          setRefreshing(false);
        });
        console.log('Filtered list');
      } else {
        API.graphql(graphqlOperation(query)).then(res => {
          setEvents(res.data.listEvents.items);
          setRefreshing(false);
        });
        console.log('Unfiltered list');
      }
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
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
              adminApproved={item.adminApproved}
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
          onEndReached={() => {
            if (nextToken == null) return;
            loadAdditionalEvents();
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default AdminEventList;
