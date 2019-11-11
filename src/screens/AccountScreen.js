import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {Container, Card, Body, Content, CardItem} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import * as queries from '../graphql/queries';

const AccountScreen = () => {
  const [account, setAccount] = useState(
  Auth.currentAuthenticatedUser()
  .then(user => API.graphql(graphqlOperation(queries.getUser, {id : user.username})))
  .then(res => {setAccount(res.data.getUser)})
  );
  
  return account ? (
    <Container>
        <Content>
          <Card transparent>
            <CardItem header style={{allignItems:'center', justifyContent:'center'}}>
                <Text style = {{fontWeight:'bold'}}>{account.name}</Text>
            </CardItem>
          </Card>      
        
          <Card transparent style = {{padding: 20}}>
          <CardItem>
              <Text>Email:      {account.email}</Text>
          </CardItem>
          <CardItem>
              <Text>Reward Points:      {account.rewardPoints}</Text>
          </CardItem>
          <CardItem>
              <Text>Account Type:     {account.accountType}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Event History:      {account.rewardHistory}</Text>
              <Text>Reward History:     {account.eventHistory}</Text>
            </Body>
          </CardItem>
          </Card>
        </Content>
      </Container>
  ) : null ;
};

export default AccountScreen;
