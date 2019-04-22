import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";
import { PropTypes } from "prop-types";

class LoginDialog extends Component {
  state = {
    email: "",
    pwd: ""
  };

  render() {
    return (
      <Form>
        <TextInput
          theme={{
            colors: {
              primary: "#000"
            }
          }}
          label={"Username"}
          onChangeText={text => {
            this.setState({
              email: text
            });
            this.props.usernameChange(text);
          }}
          value={this.state.email}
          placeholder={"Type the Username here"}
          mode="outlined"
        />
        <TextInput
          theme={{
            colors: {
              primary: "#000"
            }
          }}
          label={"Password"}
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({
              pwd: text
            });
            this.props.passwordChange(text);
          }}
          value={this.state.pwd}
          placeholder={"Type the Password here"}
          mode="outlined"
        />

        <Button
          theme={{
            colors: {
              primary: "#FFFFFF"
            }
          }}
          mode="contained"
          onPress={() => {
            this.props.handleLogin();
            this.setState({
              email: "",
              pwd: ""
            });
          }}
          compact={true}
          contentStyle={styles.buttonInner}
          style={styles.button}
        >
          <Text> Login </Text>
        </Button>
        <Button
          theme={{
            colors: {
              primary: "#FFFFFF"
            }
          }}
          mode="contained"
          onPress={() => {
            this.props.handleSignup();
            this.setState({
              email: "",
              pwd: ""
            });
          }}
          compact={true}
          contentStyle={styles.buttonInner}
          style={styles.button}
        >
          <Text> Sign Up </Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  buttonInner: {
    height: 50
  },
  formLabels: {
    paddingBottom: 4
  }
});

LoginDialog.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginDialog;
