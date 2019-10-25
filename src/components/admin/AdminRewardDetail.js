import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Body,
  Content,
  CardItem,
  Icon,
  Fab
} from 'native-base';
import { Text, Alert } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';

import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const AdminRewardDetail = () => {
  const rewardId = useNavigationParam('id');
  const [reward, setReward] = useState();
  const [user, setUser] = useState();
  const { navigate } = useNavigation();

  const [rewardLoaded, setRewardLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getReward, {
        id: rewardId
      })
    ).then(res => {
      setReward(res.data.getReward);
      setRewardLoaded(true);
    });
    Auth.currentAuthenticatedUser().then(user =>
      API.graphql(
        graphqlOperation(queries.getUser, {
          id: user.username
        })
      ).then(res => {
        setUser(res.data.getUser);
        setUserLoaded(true)
      })
    );

  }, []);


  // TODO add error catching and handling
  const editReward = () => {
    if (userLoaded && rewardLoaded) {
      console.log("edit reward here")
    }
    
  };

  // TODO add an error message if event failed to load
  return reward ? (
    <Container>
      <Content>
        <Card transparent>
          <CardItem
            header
            style={{ allignItems: 'center', justifyContent: 'center' }}
          >
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{reward.name}</Text>
              <Text>{reward.brand}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Text>{reward.description}</Text>
          </CardItem>
          <CardItem>
            <Text>{reward.rewardPointValue}</Text>
          </CardItem>
          <CardItem>
            <Text>{reward.link}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {`Start Date: ${new Date(reward.startDate).toDateString()}`}
              </Text>
              <Text>
                {`End Date: ${new Date(reward.endDate).toDateString()}`}
              </Text>
            </Body>
          </CardItem>
        </Card>

      </Content>
      <Fab
        position="bottomRight"
        onPress={() => {
            navigate('EditRewardScreen');
          }}
        style={ {backgroundColor: '#A00'} }
      >
        {(
          <Icon name="md-clipboard" />
        )}
      </Fab>
    </Container>
  ) : null;
};

export default AdminRewardDetail;
