import React, { Component } from "react";
import { Container, Content, View } from "native-base";
import { StyleSheet } from "react-native";
import SettingsFields from "../components/SettingsFields";

class Settings extends Component {
  render() {
    return (
      <View style={styles.view}>
        <SettingsFields input="username" />
        <SettingsFields input="email" />
        <SettingsFields input="password" />
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
