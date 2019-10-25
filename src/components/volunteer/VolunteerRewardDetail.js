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
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const VolunteerRewardDetail = () => {
  const rewardId = useNavigationParam('id');
  const [reward, setReward] = useState();
  const [user, setUser] = useState();
  const [rewardLoaded, setRewardLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [userPoints, setUserPoints] = useState(
    Auth.currentAuthenticatedUser().then(user =>
      setUserPoints(user.rewardPoints)
    )
  );
  const [username, setUsername] = useState(
    Auth.currentAuthenticatedUser().then(user => setUsername(user.username))
  );

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
        console.log(res);
        setUser(res.data.getUser);
        setUserLoaded(true)
      })
    );

  }, []);

  const checkValue = () => {

    return user.rewardPoints >= reward.rewardPointValue;
  }

  // TODO add error catching and handling
  const buyReward = () => {
    if (userLoaded && rewardLoaded) {
      if (checkValue()) {
        user.rewardPoints = user.rewardPoints - reward.rewardPointValue;
        user.purchaseHistory = [...user.purchaseHistory, rewardId]
        API.graphql(graphqlOperation(mutations.updateUser, { input: user })).then(
          updatedUser => {
            console.log(updatedUser);
            setUser(updatedUser.data.updatedUser);
          }
        );
        setPurchased(true);
      } else {
        Alert.alert('Not enough points');
        console.log("not enough points");
      }
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
        onPress={buyReward}
        style={
          purchased
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        {purchased ? (
          <Icon name="md-close" />
        ) : (
          <Icon name="md-add" />
        )}
      </Fab>
    </Container>
  ) : null;
};

export default VolunteerRewardDetail;
