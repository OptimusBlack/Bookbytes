import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import LoginDialog from "../components/LoginDialog";
import { PropTypes } from "prop-types";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  /**
   * Function to handle user login. Put login logic here
   */
  handleLogin = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.loginForm}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <LoginDialog handleLogin={this.handleLogin} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  loginForm: {
    width: "60%"
  }
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Login;
