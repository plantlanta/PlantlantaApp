import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AccountType from '../components/AccountType';
import AdminEventList from '../components/admin/AdminEventList';
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
  const accountType = AccountType();

  if (accountType === 'volunteer') {
    return <VolunteerEventList />;
  }
  if (accountType === 'staff') {
    return <StaffEventList />;
  }
  if (accountType === 'admin') {
    return <AdminEventList />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default EventListScreen;
