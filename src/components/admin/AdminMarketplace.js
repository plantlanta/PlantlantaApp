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

const query = `query ListRewards(
    $filter: ModelRewardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        brand
        rewardPointValue
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
    brand,
    rewardPointValue
}) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(`pressed ${id}`);
        // navigate('RewardDetailScreen', { id });
      }}
    >
      <Text style={styles.textStyle}>{name}</Text>
      <Text style={styles.textStyle}>
        {`Reward Points: ${rewardPointValue}`}
      </Text>
      <Text style={styles.textStyle}>
        {`Brand: ${brand}`}
      </Text>
    </TouchableOpacity>
  );
};

const AdminMarketplace = () => {
  const [rewards, setRewards] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const loadRewards = () => {
    if (!refreshing) {
      setRefreshing(true);
      API.graphql(graphqlOperation(query)).then(res => {
        setRewards(res.data.listRewards.items);
        setRefreshing(false);
      });
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={rewards}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            brand={item.brand}
            rewardPointValue={item.rewardPointValue}
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
        onRefresh={loadRewards}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default AdminMarketplace;
