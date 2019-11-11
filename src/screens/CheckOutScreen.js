import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import StaffCheckOut from '../components/staff/StaffCheckOut';
import AccountType from '../components/AccountType';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const CheckOutScreen = () => {
  const accountType = AccountType();

  if (accountType === 'staff') {
    return <StaffCheckOut />;
  }
 

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default CheckOutScreen;
