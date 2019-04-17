import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Form, Input, Item as FormItem, Label, Button } from "native-base";
import { PropTypes } from "prop-types";

class LoginDialog extends Component {
  render() {
    return (
      <Form>
        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Email</Label>
          <Input onChangeText={this.props.usernameChange} />
        </FormItem>
        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={this.props.passwordChange}
          />
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
        <Button
          full
          rounded
          light
          style={styles.loginButton}
          onPress={this.props.handleSignup}
        >
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
