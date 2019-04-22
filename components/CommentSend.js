import React, { Component } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from "react-native-paper";

class CommentSend extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          onChangeText={this.props.messageChange}
        />
        <Button
          style={styles.button}
          icon="send"
          onPress={this.props.sendMessage}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    flex: 1,
    paddingBottom: 5
  },
  button: {
    padding: 15,
    width: "15%"
  }
});

export default CommentSend;
