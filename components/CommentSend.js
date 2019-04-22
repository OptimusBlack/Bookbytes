import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button } from "react-native-paper";

class CommentSend extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.props.messageChange}
        />
        <Button
          style={styles.button}
          icon="send"
          onPress={this.props.sendMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    width: "80%",
    margin: 10,
    padding: 4
  },
  button: {
    marginTop: 32,
    width: "15%"
  }
});

export default CommentSend;
