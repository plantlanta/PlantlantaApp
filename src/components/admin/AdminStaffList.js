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

const query = `query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        accountType
        adminApproved
      }
      nextToken
    }
  }
  `;

const filter = {
  adminApproved: {
    eq: false
  },
  accountType: {
    eq: 'staff'
  }
};

const Item = ({ id, accountType, name, email }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(`pressed ${id}`);
        navigate('AdminUserScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{name}</Text>
      <Text style={styles.textStyle}>{email}</Text>
    </TouchableOpacity>
  );
};

const AdminStaffList = () => {
  const [events, setEvents] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query, filter)).then(res => {
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
      <Container>
        <FlatList
          style={{ flex: 1 }}
          data={events}
          renderItem={({ id, accountType, name, email }) => (
            <Item id={id} accountType={accountType} name={name} email={email} />
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
      </Container>
    </SafeAreaView>
  );
};

export default AdminStaffList;
