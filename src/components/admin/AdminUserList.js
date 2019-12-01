import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Container } from 'native-base';
import UserList from '../UserList';

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

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const { navigate } = useNavigation();
        const { id } = item.id;
        console.log(`pressed ${id}`);
        navigate('AdminUserDetailScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{`Name: ${item.name}`}</Text>
      <Text style={styles.textStyle}>{`Email: ${item.email}`}</Text>
      <Text style={styles.textStyle}>
        {`Account Type: ${item.accountType}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Admin Approved: ${item.adminApproved ? 'Yes' : 'No'}`}
      </Text>
    </TouchableOpacity>
  );
};

const AdminUserList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Container>{UserList(renderItem, query)}</Container>
    </SafeAreaView>
  );
};

export default AdminUserList;
