import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import StaffCheckIn from '../components/staff/StaffCheckIn';
import VolunteerEventDetail from '../components/volunteer/VolunteerEventDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const EventDetailScreen = () => {
  const [accountType, setAccountType] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      setAccountType(user.attributes['custom:accountType']);
    });
  }, []);

  if (accountType === 'staff') {
    return <StaffCheckIn />;
  }
  if (accountType === 'volunteer') {
    return <VolunteerEventDetail />;
  }
  if (accountType === 'admin') {
    return <VolunteerEventDetail />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default EventDetailScreen;
