import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

const EventList = (renderItem, query) => {
  const [events, setEvents] = useState();
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
    <FlatList
      style={{ flex: 1 }}
      data={events}
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
      onRefresh={loadEvents}
      refreshing={refreshing}
    />
  );
};

export default EventList;
