import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Body,
  Content,
  CardItem,
  Button,
  Left,
  Right
} from 'native-base';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../graphql/queries';




const EventDetail = () => {
  const [event, setEvent] = useState();
  const id = useNavigationParam('id');

  const loadEvent = () => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id
      })
    ).then(res => {
      setEvent(res.data.getEvent);
    });
  };

  useEffect(() => {
    loadEvent();
  }, []);

  signUp = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user.username);
        event.volunteers.push(user.username)
        console.log(event)
      })
  };

  return event ? (
    <Container>
      <Content>
        <Card transparent>
          <CardItem
            header
            style={{ allignItems: 'center', justifyContent: 'center' }}
          >
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{event.name}</Text>
              <Text>{event.organization}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Text>{event.address}</Text>
          </CardItem>
          <CardItem>
            <Text>{event.description}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {`Start Date: ${new Date(event.startDate).toDateString()}`}
              </Text>
              <Text>
                {`End Date: ${new Date(event.endDate).toDateString()}`}
              </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header>
            <Text>Coordinator Contact Information</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{event.coordinator}</Text>
              <Text>{event.coordinatorEmail}</Text>
              <Text>{event.coordinatorPhone}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card transparent>
          <CardItem>
            <Left />
            <Right>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={signUp}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  ) : null;
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 14,
    marginTop: 20,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});
