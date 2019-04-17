import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";

class SettingsFields extends Component {
  state = {
    text: ""
  };

  render() {
    return (
      <Form style={styles.form}>
        <TextInput
          label={"New " + this.props.input}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          placeholder={"Type " + this.props.input}
          mode="outlined"
        />
        <Button
          mode="contained"
          compact={true}
          contentStyle={styles.buttonInner}
          style={styles.button}
        >
          {"Change " + this.props.input}
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 10
  },
  button: {
    marginTop: 10
  },
  buttonInner: {
    height: 50
  }
});

export default SettingsFields;
