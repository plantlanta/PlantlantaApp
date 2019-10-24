import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import StaffEventList from '../components/staff/StaffEventList';
import VolunteerEventList from '../components/volunteer/VolunteerEventList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const EventListScreen = () => {
  const [accountType, setAccountType] = useState();
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      setAccountType(user.attributes['custom:accountType']);
    });
  }, []);

  if (accountType === 'staff') {
    return <StaffEventList />;
  }
  if (accountType === 'volunteer') {
    return <VolunteerEventList />;
  }
  if (accountType === 'admin') {
    return <VolunteerEventList />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default EventListScreen;
