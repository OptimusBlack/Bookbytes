import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { userLogin } from "../redux/actions";

import { Form, Input, Item as FormItem, Label, Button } from "native-base";
import { PropTypes } from "prop-types";

class LoginDialog extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillMount() {
    // TODO : Logout user if the login screen mounts

    this.setState({
      username: "",
      password: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      nextProps.handleLogin();
    }
  }

  render() {
    return (
      <Form>
        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Email</Label>
          <Input onChangeText={value => this.setState({ username: value })} />
        </FormItem>

        <FormItem floatingLabel style={styles.formLabels}>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
          />
        </FormItem>

        <Button
          full
          rounded
          light
          style={styles.loginButton}
          onPress={() => {
            this.props.loginUser(this.state.username, this.state.password);
          }}
          title={""}
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
  handleLogin: PropTypes.func.isRequired,
  loginUser: PropTypes.func
};

const mapStateToProps = state => ({
  username: state.UserLogin.username,
  isAuth: state.UserLogin.isAuth
});

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password) => dispatch(userLogin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);
