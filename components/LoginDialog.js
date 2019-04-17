/* global require */
import React, { Component } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Form, Input, Item as FormItem, Label, Button } from "native-base";
import { PropTypes } from "prop-types";

class LoginDialog extends Component {
  render() {
    return (
      <Form
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={require("../assets/splash.png")} />
        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Email</Label>
          <Input />
        </FormItem>

        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Password</Label>
          <Input secureTextEntry={true} />
        </FormItem>

        <Button
          full
          rounded
          light
          style={styles.loginButton}
          onPress={this.props.handleLogin}
        >
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

LoginDialog.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginDialog;
