import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AdminUserList from '../components/admin/AdminUserList';
import AccountType from '../components/AccountType';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AdminUserListScreen = () => {
  const accountType = AccountType();
  if (accountType === 'admin') {
    return <AdminUserList />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default AdminUserListScreen;
