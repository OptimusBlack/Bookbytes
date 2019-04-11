import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Form, Input, Item as FormItem, Label, Button } from "native-base";

class SettingsFields extends Component {
  render() {
    return (
      <Form style={styles.form}>
        <Label>Change {this.props.input}</Label>
        <FormItem>
          <Input placeholder={"New " + this.props.input} />
        </FormItem>
        <Button full light style={styles.button}>
          <Text>{"Change " + this.props.input}</Text>
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
  }
});

export default SettingsFields;
