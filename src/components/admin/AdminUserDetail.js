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

const AdminUserDetail = () => {
  const userId = useNavigationParam('id');
  const [user, setUser] = useState();

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.getUser, {
        id: userId
      })
    ).then(res => {
      setUser(res.data.getUser);
    });
  }, []);

  // TODO add error catching and handling
  const approveUser = () => {
    API.graphql(
      graphqlOperation(mutations.updateEvent, {
        input: { ...user, adminApproved: true }
      })
    ).then(updatedEvent => {
      setUser(updatedEvent.data.updateEvent);
    });
  };

  // TODO add an error message if event failed to load
  return user ? (
    <Container>
      <Content>
        <Card transparent>
          <CardItem
            header
            style={{ allignItems: 'center', justifyContent: 'center' }}
          >
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
              <Text>{user.email}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Fab
        position="bottomRight"
        onPress={approveUser}
        style={
          user.adminApproved
            ? { backgroundColor: '#A00' }
            : { backgroundColor: '#64dd17' }
        }
      >
        {user.adminApproved ? <Icon name="md-close" /> : <Icon name="md-add" />}
      </Fab>
    </Container>
  ) : null;
};

export default AdminUserDetail;
