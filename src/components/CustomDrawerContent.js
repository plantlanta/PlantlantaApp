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
    console.log(accountType);
  }
  if (accountType === 'staff') {
    newItems = items.filter(obj => obj.routeName !== 'Rewards');
  }
  if (accountType === 'admin') {
    console.log(accountType);
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
