import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Form, Input, Item as FormItem, Label, Button } from "native-base";

class LoginDialog extends Component {
  render() {
    return (
      <Form>
        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Email</Label>
          <Input />
        </FormItem>

        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Password</Label>
          <Input secureTextEntry={true} />
        </FormItem>

        <Button full rounded light style={styles.loginButton}>
          <Text> Login </Text>
        </Button>
        <Button full rounded light style={styles.loginButton}>
          <Text> Sign Up </Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    margin: 10,
    padding: 4
  },
  formLabels: {
    paddingBottom: 4
  }
});

export default LoginDialog;
