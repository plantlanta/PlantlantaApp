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
import { Text, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUser } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#000'
  }
});

const AdminUserDetail = () => {
  const userId = useNavigationParam('id');
  const [user, setUser] = useState();

  useEffect(() => {
    API.graphql(
      graphqlOperation(getUser, {
        id: userId
      })
    ).then(res => {
      setUser(res.data.getUser);
    });
  }, []);

  // TODO add error catching and handling
  const approveUser = () => {
    API.graphql(
      graphqlOperation(updateUser, {
        input: { ...user, adminApproved: !user.adminApproved }
      })
    ).then(updatedUser => {
      setUser(updatedUser.data.updateUser);
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
              <Text style={styles.textStyle}>{`Name: ${user.name}`}</Text>
              <Text style={styles.textStyle}>{`Email: ${user.email}`}</Text>
              <Text style={styles.textStyle}>
                {`Account Type: ${user.accountType}`}
              </Text>
              <Text style={styles.textStyle}>
                {`Admin Approved: ${user.adminApproved ? 'Yes' : 'No'}`}
              </Text>
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
