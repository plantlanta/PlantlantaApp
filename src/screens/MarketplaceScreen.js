import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import UserMarketplace from '../components/user/UserMarketplace';
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
  const [accountType, setAccountType] = useState();
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      setAccountType(user.attributes['custom:accountType']);
    });
  }, []);

  if (accountType === 'volunteer') {
    return <UserMarketplace />;
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
