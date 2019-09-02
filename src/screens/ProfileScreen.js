import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
export default class ScreenName extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.centeredElem}>
          {/* <Image style={styles.icon} source={require('./assets/jn1.jpg')} /> */}
          <Text style={styles.displayname}>John Snow</Text>
        </View>

        <View style={styles.rowAlignment}>
          <Text style={{ paddingTop: 20 }}>Reward Point</Text>
          <Text style={styles.score}>421</Text>
        </View>

        <View style={styles.rowAlignment}>
          <Text>Email: winterfell123@got.com</Text>
          <Button title="CHANGE" color="green" />
        </View>

        <View style={{ paddingTop: 20 }}>
          <Button title="REPORT A PROBLEM" color="green" />
        </View>
      </View>
    );
  }
}
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
  screen: {
    padding: 50,
  },
  centeredElem: {
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  displayname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowAlignment: {
    alignItems: 'center',
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    textAlign: 'center',
    borderColor: 'green',
    borderWidth: 2,
    padding: 2,
  },
});
