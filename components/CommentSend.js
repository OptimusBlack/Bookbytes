import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Input } from "native-base";

class CommentSend extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input style={styles.input} onChangeText={this.props.messageChange} />
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    width: "80%",
    margin: 10,
    padding: 4
  },
  button: {
    margin: 5,
    width: "15%"
  }
});

export default CommentSend;
