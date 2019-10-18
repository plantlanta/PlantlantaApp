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

const UserEventDetail = () => {
  const eventId = useNavigationParam('id');
  const [event, setEvent] = useState();
  const [username, setUsername] = useState(
    Auth.currentAuthenticatedUser().then(user => setUsername(user.username))
  );

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id: eventId
      })
    ).then(res => {
      setEvent(res.data.getEvent);
    });
  }, []);

  const checkParticipation = () => event.volunteers.includes(username);

  // TODO add error catching and handling
  const signUp = () => {
    if (checkParticipation()) {
      event.volunteers.pop(username);
    } else {
      event.volunteers.push(username);
    }
    API.graphql(graphqlOperation(mutations.updateEvent, { input: event })).then(
      updatedEvent => {
        setEvent(updatedEvent.data.updateEvent);
      }
    );
  };

  // TODO add an error message if event failed to load
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
      </Content>
      <Fab
        position="bottomRight"
        onPress={signUp}
        style={
          checkParticipation()
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        {checkParticipation() ? (
          <Icon name="md-close" />
        ) : (
          <Icon name="md-add" />
        )}
      </Fab>
    </Container>
  ) : null;
};

export default UserEventDetail;
