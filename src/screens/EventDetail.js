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

  const loadEvent = () => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id
      })
    ).then(res => {
      setEvent(res.data.getEvent);
    });
  };

  const plusIcon = <Icon name="plus" size={30} color="#008000" />;
  const xIcon = <Icon name="x" size={30} color="#008000" />;

  useEffect(() => {
    loadEvent();
  }, []);

  signUp = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.floatingAction.icon = xIcon
        console.log(user.username);
        if (event.volunteers.includes(user.username)) {
          event.volunteers.pop(user.username)
        } else {
          event.volunteers.push(user.username)
        }
        console.log(event)
      })
      const input = event
      API.graphql(graphqlOperation(mutations.updateEvent, { input })).then(
        event => {
          console.log(event);
        }
      );
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
        <Card>
          <FloatingAction
            // actions={actions}
            ref={(ref) => { this.floatingAction = ref; }}
            color='#FFFFFF'
            onPressMain={signUp}
            floatingIcon={plusIcon}
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
