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
import { Text } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const UserRewardDetail = () => {
  const rewardId = useNavigationParam('id');
  const [reward, setReward] = useState();
  const [userPoints, setUserPoints] = useState(
      Auth.currentAuthenticatedUser().then(user => setUserPoints(user.rewardPoints))
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
    });
  }, []);

  const checkValue = () => userPoints >= reward.rewardPointValue;

  // TODO add error catching and handling
  const buyReward = () => {
    if (checkValue()) {
      console.log("buy reward");
    } else {
        console.log("not enough points");
    }
    // API.graphql(graphqlOperation(mutations.updateEvent, { input: event })).then(
    //   updatedEvent => {
    //     setEvent(updatedEvent.data.updateEvent);
    //   }
    // );
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
          checkValue()
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        {checkValue() ? (
          <Icon name="md-close" />
        ) : (
          <Icon name="md-add" />
        )}
      </Fab>
    </Container>
  ) : null;
};

export default UserRewardDetail;
