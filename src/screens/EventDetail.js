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
import { FloatingAction } from "react-native-floating-action";
import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import Icon from 'react-native-vector-icons/Foundation';




const EventDetail = () => {
  const [event, setEvent] = useState();
  const id = useNavigationParam('id');
  const [username, setUsername] = useState();

  const loadEvent = () => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id
      })
    ).then(res => {
      setEvent(res.data.getEvent);
    });
  };

  const xIcon = <Icon name="x" size={30} color="#008000" />;
  const plusIcon = <Icon name="plus" size={30} color="#008000" />;

  useEffect(() => {
    loadEvent();
    getUserName();
  }, []);

  getUserName = () => {
    Auth.currentAuthenticatedUser().then(user => setUsername(user.username))
  }

  signUp = () => {
    console.log(event)
    if (event.volunteers.includes(username)) {
      event.volunteers.pop(username)
    } else {
      event.volunteers.push(username)
    }
    const input = event
    API.graphql(graphqlOperation(mutations.updateEvent, { input })).then(
      event => {
        setEvent(event.data.updateEvent);
      }
    );
  };

  checkParticipation = () => {
    // console.log(event.volunteers)
    if (event.volunteers.includes(username)) {
      console.log("True")
      return true;
    } else {
      console.log("false")
      return false;
    }
  }


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
        <Card>
          <FloatingAction
            // actions={actions}
            color='#FFFFFF'
            onPressMain={signUp}
            floatingIcon={checkParticipation() ? plusIcon : xIcon}
          />
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
