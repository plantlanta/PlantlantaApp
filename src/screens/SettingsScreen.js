import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

export default class ScreenName extends Component {
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Authloading");
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.signOut()}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa73b7",
    alignItems: "center",
    justifyContent: "center"
  }
});
