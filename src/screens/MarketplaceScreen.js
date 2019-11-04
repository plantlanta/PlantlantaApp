import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AccountType from '../components/AccountType';
import VolunteerMarketplace from '../components/volunteer/VolunteerMarketplace';
import AdminMarketplace from '../components/admin/AdminMarketplace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const MarketplaceScreen = () => {
  const accountType = AccountType();

  if (accountType === 'volunteer') {
    return <VolunteerMarketplace />;
  }
  if (accountType === 'admin') {
    return <AdminMarketplace />;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default MarketplaceScreen;
