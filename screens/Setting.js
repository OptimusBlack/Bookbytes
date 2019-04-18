import React, { Component } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import SettingsFields from "../components/SettingsFields";
import Parse from "parse/react-native";

class Settings extends Component {
  state = {
    text: ""
  };

  textDetails = function(text) {
    this.setState({ ...this.state, text: text });
  };

  changePassword = function() {
    let currentUser = Parse.User.current();
    if (currentUser) {
      // console.log(this.state.text);
      currentUser
        .save({ password: this.state.text })
        .then(() => {
          // console.log("Password Reset");
        })
        .catch(error => {
          // console.log("Error " + error.code + " : " + error.message);
        });
    } else {
      // console.log("Not the Current User");
      // console.log(this.state.text);
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <SettingsFields input="Username" />
        <SettingsFields input="Email" />
        <SettingsFields
          input="Password"
          textDetails={this.textDetails.bind(this)}
          changeDetails={this.changePassword.bind(this)}
        />
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
