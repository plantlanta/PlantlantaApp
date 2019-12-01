import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

const UserList = (renderItem, query) => {
  const [users, setUsers] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const renderItemCall = useCallback(({ item }) => renderItem({ item }), []);

  //   const loadEvents = filter => {
  //     if (!refreshing) {
  //       setRefreshing(true);
  //       if (filter) {
  //         API.graphql(graphqlOperation(query, filter)).then(res => {
  //           setEvents(res.data.listEvents.items);
  //           setRefreshing(false);
  //         });
  //         console.log('Filtered list');
  //       } else {
  //         API.graphql(graphqlOperation(query)).then(res => {
  //           setEvents(res.data.listEvents.items);
  //           setRefreshing(false);
  //         });
  //         console.log('Unfiltered list');
  //       }
  //     }
  //   };

  const loadUsers = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query)).then(res => {
        // console.log(res);
        setUsers(res.data.listUsers.items);
        setRefreshing(false);
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={users}
      renderItem={renderItemCall}
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
  );
};

export default UserList;
