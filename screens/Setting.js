import React, { Component } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import SettingsFields from "../components/SettingsFields";

class Settings extends Component {
  render() {
    return (
      <View style={styles.view}>
        <SettingsFields input="Username" />
        <SettingsFields input="Email" />
        <SettingsFields input="Password" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10
  }
});

export default Settings;
