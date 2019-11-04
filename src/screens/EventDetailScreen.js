import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AdminEventDetail from '../components/admin/AdminEventDetail';
import StaffCheckIn from '../components/staff/StaffCheckIn';
import VolunteerEventDetail from '../components/volunteer/VolunteerEventDetail';
import AccountType from '../components/AccountType';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const EventDetailScreen = () => {
  const accountType = AccountType();

  if (accountType === 'volunteer') {
    return <VolunteerEventDetail />;
  }
  if (accountType === 'staff') {
    return <StaffCheckIn />;
  }
  if (accountType === 'admin') {
    return <AdminEventDetail />;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default EventDetailScreen;
