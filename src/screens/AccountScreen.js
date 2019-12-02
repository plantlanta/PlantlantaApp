import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Container, Card, Body, Content, CardItem } from 'native-base';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import * as queries from '../graphql/queries';

const RewardItem = ({ id, name, link, coupon }) => {
  return (
    <Card transparent style={{ padding: 20 }}>
      <CardItem>
        <Text>Reward: {name}</Text>
      </CardItem>
      <CardItem>
        <Text>Link: {link}</Text>
      </CardItem>
      <CardItem>
        <Text>Coupon Code: {coupon}</Text>
      </CardItem>
    </Card>
  );
};

const EventItem = ({ id, name, timeIn, timeOut }) => {
  return (
    <Card transparent style={{ padding: 20 }}>
      <CardItem>
        <Text>Event: {name}</Text>
      </CardItem>
      <CardItem>
        <Text>Check In: {new Date(timeIn).toString()}</Text>
      </CardItem>
      <CardItem>
        <Text>Check Out: {new Date(timeOut).toString()}</Text>
      </CardItem>
    </Card>
  );
};

const AccountScreen = () => {
  const [account, setAccount] = useState(
    Auth.currentAuthenticatedUser()
      .then(user =>
        API.graphql(graphqlOperation(queries.getUser, { id: user.username }))
      )
      .then(res => {
        setAccount(res.data.getUser);
      })
  );

  return account ? (
    <Container>
      <Content>
        <Card transparent>
          <CardItem
            header
            style={{ allignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontWeight: 'bold' }}>{account.name}</Text>
          </CardItem>
        </Card>

        <Card transparent style={{ padding: 20 }}>
          <CardItem>
            <Text>Email: {account.email}</Text>
          </CardItem>
          <CardItem>
            <Text>Reward Points: {account.rewardPoints}</Text>
          </CardItem>
          <CardItem>
            <Text>Account Type: {account.accountType}</Text>
          </CardItem>
          <CardItem>
            <Text>Event History</Text>
          </CardItem>
          <CardItem>
            <FlatList
              style={{ flex: 1 }}
              data={account.eventHistory}
              renderItem={({ item }) => (
                <EventItem
                  id={item.id}
                  timeIn={item.timeIn}
                  timeOut={item.timeOut}
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
            />
          </CardItem>
          <CardItem>
            <Text>Rewards</Text>
          </CardItem>
          <CardItem>
            <FlatList
              style={{ flex: 1 }}
              data={account.rewardHistory}
              renderItem={({ item }) => (
                <RewardItem
                  id={item.id}
                  name={item.name}
                  link={item.link}
                  coupon={item.coupon}
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
            />
          </CardItem>
        </Card>
      </Content>
    </Container>
  ) : null;
};

export default AccountScreen;
