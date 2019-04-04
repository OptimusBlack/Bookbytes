import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Content } from "native-base";
import LoginDialog from "../components/LoginDialog";

class Login extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.loginForm}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <LoginDialog />
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

export default Login;
