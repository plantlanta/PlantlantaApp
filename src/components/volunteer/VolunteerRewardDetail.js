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

const VolunteerRewardDetail = () => {
  const rewardId = useNavigationParam('id');
  const [reward, setReward] = useState();
  const [user, setUser] = useState();
  const { navigate } = useNavigation();

  const [rewardLoaded, setRewardLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getReward, {
        id: rewardId
      })
    ).then(res => {
      setReward(res.data.getReward);
      setRewardLoaded(true);
    });

    API.graphql(
      graphqlOperation(queries.getUser, {
        id: user.username
      })
    ).then(res => {
      console.log(res);
      setUser(res.data.getUser);
      setUserLoaded(true);
    });
  }, []);

  const checkRewardNotAvailable = () =>
    rewardLoaded && reward.coupon.length === 0;

  // TODO add error catching and handling
  const buyReward = () => {
    if (userLoaded && rewardLoaded) {
      if (user.rewardPoints >= reward.rewardPointValue) {
        console.log(reward);
        const newcoupon = reward.coupon.pop();
        if (newcoupon == null) {
          Alert.alert(
            'Error!',
            'This reward has no more coupons available!',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
              }
            ],
            { cancelable: false }
          );
          console.log('No more coupons');
          return;
        }
        setReward(reward);
        console.log(newcoupon);

        const userReward = {
          id: rewardId,
          name: reward.name,
          link: reward.link,
          coupon: newcoupon
        };
        user.rewardHistory = [...user.rewardHistory, userReward];
        user.rewardPoints -= reward.rewardPointValue;
        // console.log(user)

        // update user and reward data
        let input = reward;
        API.graphql(graphqlOperation(mutations.updateReward, { input })).then(
          res => {
            console.log(res);
          }
        );
        input = user;
        API.graphql(graphqlOperation(mutations.updateUser, { input })).then(
          res => {
            console.log(res);
          }
        );
        Alert.alert(
          'Success!',
          'Your reward has been added to your account!',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error!',
          'Not enough points!',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            }
          ],
          { cancelable: false }
        );
        console.log('not enough points');
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
          checkRewardNotAvailable()
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        <Icon name="md-add" />
      </Fab>
    </Container>
  ) : null;
};

export default VolunteerRewardDetail;
