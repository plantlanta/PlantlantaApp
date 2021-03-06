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
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Fab, Icon, Container } from 'native-base';


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
        navigate('RewardDetailScreen', { id });
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
  const { navigate } = useNavigation();
  const [user, setUser] = useState(Auth.currentAuthenticatedUser().then(user => setUser(user.username)))

  const filter = {
    creator: {
      ge: user
    }
  };

  
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

  const loadRewards = () => {
    if (!refreshing) {
      setRefreshing(true);
      console.log(user);
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
      <Fab
          position="bottomRight"
          style={{ backgroundColor: '#64dd17' }}
          onPress={() => {
            navigate('CreateRewardScreen');
          }}
        >
          <Icon name="md-add" style={{ color: '#FFF' }} />
        </Fab>
    </SafeAreaView>
    
  );
};

export default AdminMarketplace;
