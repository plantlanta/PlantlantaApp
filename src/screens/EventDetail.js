import React, { useState,useEffect } from 'react';
import {Container, Text, Card, Header, Body, Title, Content, CardItem, Button, Left, Right} from 'native-base';
import * as queries from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


Item = ({
    name,
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
          <Header style ={{backgroundColor:'green'}}>
            <Body style = {{alignItems:'center'}}>
              <Title>Event Detail</Title>
            </Body>
          </Header>
        <Content>

          <Card transparent>
            <CardItem header style={{allignItems:'center', justifyContent:'center'}}>
                <Text>{name}</Text>
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

export default EventDetail = id => {
    const [detail, setDetail] = useState();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadDetail();
      }, []);
    
    loadDetail = async () => {
        if (!refreshing) {
            setRefreshing(true);
            const event = await API.graphql(
                graphqlOperation(queries.getEvent, {id: id})
            );
            setDetail(event.data.getEvent);
            setRefreshing(false);
            }
    };

    return (
        <Item
        name = {detail.name}
        address = {detail.address}
        description = {detail.description}
        startDate = {detail.startDate}
        endDate = {detail.endDate}
        coorName = {detail.coordinator}
        coorEmail = {detail.coordinatorEmail}
        coorContact = {detail.coordinatorPhone}
        />
    );
};