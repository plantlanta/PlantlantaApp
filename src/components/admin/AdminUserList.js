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
  }
  //   accountType: {
  //     eq: 'admin'
  //   }
};

const Item = ({ id, accountType, adminApproved, name, email }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(`pressed ${id}`);
        navigate('AdminUserDetailScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{`Name: ${name}`}</Text>
      <Text style={styles.textStyle}>{`Email: ${email}`}</Text>
      <Text style={styles.textStyle}>{`Account Type: ${accountType}`}</Text>
      <Text style={styles.textStyle}>
        {`Admin Approved: ${adminApproved ? 'Yes' : 'No'}`}
      </Text>
    </TouchableOpacity>
  );
};

const AdminUserList = () => {
  const [events, setEvents] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query, filter)).then(res => {
        setEvents(res.data.listUsers.items);
        setRefreshing(false);
      });
    }
  };

  useEffect(() => {
    loadUsers();
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
              accountType={item.accountType}
              adminApproved={item.adminApproved}
              name={item.name}
              email={item.email}
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
          onRefresh={loadUsers}
          refreshing={refreshing}
        />
      </Container>
    </SafeAreaView>
  );
};

export default AdminUserList;
