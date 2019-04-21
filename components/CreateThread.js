import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";
import Parse from "parse/react-native";

class CreateThread extends Component {
  state = {
    title: "",
    description: ""
  };

  createThread = () => {
    const Thread = Parse.Object.extend("Thread");
    const currentUser = Parse.User.current();

    let newThread = new Thread();
    newThread.set("title", this.state.title);
    newThread.set("description", this.state.description);
    newThread.set("title", this.state.title);
    newThread.set("createdByUserId", currentUser.id);
    newThread.set("commentIds", []);
    newThread.save().then(thread => {
      this.setState({
        title: "",
        description: ""
      });
      this.props.addToClub(thread.id).then(() => {
        this.props.requestClose();
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Create new thread</Text>
        </View>
        <Form>
          <TextInput
            theme={themes.textBox}
            label={"Thread Name"}
            onChangeText={text => {
              this.setState({ title: text });
            }}
            placeholder="Type the thread name here"
            mode="outlined"
            value={this.state.title}
          />

          <TextInput
            theme={themes.textBox}
            label={"Thread Description"}
            onChangeText={text => {
              this.setState({ description: text });
            }}
            placeholder="Type the thread description here"
            mode="outlined"
            value={this.state.description}
          />

          <Button
            theme={themes.button}
            mode="contained"
            onPress={this.createThread}
            compact={true}
            contentStyle={styles.buttonInner}
            style={styles.button}
          >
            Create
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
  heading: {
    alignItems: "center"
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20
  },
  buttonInner: {
    height: 50
  },
  button: {
    marginTop: 10
  }
});

const themes = {
  textBox: {
    colors: {
      primary: "#000"
    }
  },
  button: {
    colors: {
      primary: "#FFFFFF"
    }
  }
};

export default CreateThread;
