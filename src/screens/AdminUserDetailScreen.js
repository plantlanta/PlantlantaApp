import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AdminUserDetail from '../components/admin/AdminUserDetail';
import AccountType from '../components/AccountType';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AdminUserDetailScreen = () => {
  const accountType = AccountType();
  if (accountType === 'admin') {
    return <AdminUserDetail />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default AdminUserDetailScreen;
