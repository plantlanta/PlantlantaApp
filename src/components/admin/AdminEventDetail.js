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
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam } from 'react-navigation-hooks';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const AdminEventDetail = () => {
  const eventId = useNavigationParam('id');
  const [event, setEvent] = useState();

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getEvent, {
        id: eventId
      })
    ).then(res => {
      setEvent(res.data.getEvent);
    });
  }, []);

  // TODO add error catching and handling
  const approveEvent = () => {
    API.graphql(
      graphqlOperation(mutations.updateEvent, {
        input: { ...event, adminApproved: !event.adminApproved }
      })
    ).then(updatedEvent => {
      setEvent(updatedEvent.data.updateEvent);
    });
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
        onPress={approveEvent}
        style={
          event.adminApproved
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        {event.adminApproved ? (
          <Icon name="md-close" />
        ) : (
          <Icon name="md-add" />
        )}
      </Fab>
    </Container>
  ) : null;
};

export default AdminEventDetail;
