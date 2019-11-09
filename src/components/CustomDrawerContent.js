import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';
import AccountType from './AccountType';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const CustomDrawerContent = props => {
  const accountType = AccountType();
  const { items } = props;
  let newItems = items;
  if (accountType === 'volunteer') {
    newItems = items.filter(obj => obj.routeName !== 'Users');
  } else if (accountType === 'staff') {
    newItems = items.filter(obj => obj.routeName !== 'Rewards' || 'Users');
  } else if (accountType === 'admin') {
    // newItems = items.filter(obj => obj.routeName !== 'Rewards');
  }
  return (
    <View styles={styles.container}>
      <SafeAreaView>
        <DrawerItems {...props} items={newItems} />
      </SafeAreaView>
    </View>
  );
};

export default CustomDrawerContent;
