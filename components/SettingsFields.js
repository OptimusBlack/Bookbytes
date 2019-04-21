import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";

class SettingsFields extends Component {
  render() {
    return (
      <Form style={styles.form}>
        <TextInput
          theme={{
            colors: {
              primary: "#000"
            }
          }}
          label={"New " + this.props.input}
          onChangeText={this.props.textDetails}
          placeholder={"Type the new " + this.props.input + " here"}
          mode="outlined"
        />
        <Button
          theme={{
            colors: {
              primary: "#FFFFFF"
            }
          }}
          mode="contained"
          onPress={this.props.changeDetails}
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
