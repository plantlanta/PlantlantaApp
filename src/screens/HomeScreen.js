import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#000',
  },
});
