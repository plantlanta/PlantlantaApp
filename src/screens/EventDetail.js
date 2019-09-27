import React, { useState, useEffect } from 'react';
import {Container, Card, Body, Content, CardItem, Button, Left, Right} from 'native-base';
import { Text } from 'react-native'
import * as queries from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


Item = ({
    name,
    organization,
    address,
    description,
    startDate,
    endDate,
    coorName,
    coorEmail,
    coorContact,
}) => {
    return (
        <Container>
        <Content>

          <Card transparent>
            <CardItem header style={{allignItems:'center', justifyContent:'center'}}>
                <Text style = {{fontWeight: 'bold'}}>{name}</Text>
                <Text>{organization}</Text>
            </CardItem>
          </Card>      
        
          <Card>
            <CardItem>
              <Text>{address}</Text>
            </CardItem>
            <CardItem>
              <Text>{description}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{`Start Date: ${new Date(startDate).toDateString()}`}</Text>
                <Text>{`End Date: ${new Date(endDate).toDateString()}`}</Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Coordinator Contact Information</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{coorName}</Text>
                <Text>{coorEmail}</Text>
                <Text>{coorContact}</Text>
              </Body>
            </CardItem>
          </Card>

          <Card transparent>
            <CardItem>
              <Left></Left>
              <Right>
                <Button success>
                  <Text>Sign Up</Text>
                </Button>
              </Right>
              </CardItem>
          </Card>
        </Content>
      </Container>
    );
};

export default EventDetail = () => {
    let [detail, setDetail] = useState();
    const [refreshing, setRefreshing] = useState(false);

    changeDetail = (variable) => setDetail(variable);

    useEffect(() => {
        loadDetail();
      }, []);
    


    loadDetail = async () => {
        if (!refreshing) {
            setRefreshing(true);
            const event = await API.graphql(graphqlOperation(
              queries.getEvent, {id: '52aa4cd6-8f2f-45bc-92e6-e7baf25508ad'}));
            
            changeDetail(event.data.getEvent);
            console.log(detail);
            setRefreshing(false);
            }
    };

    return (
        <Item
        // name = {}
        // organization = {}
        // address = {}
        // description = {}
        // startDate = {}
        // endDate = {}
        // coorName = {}
        // coorEmail = {}
        // coorContact = {}
        />
    );
};