import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";
import Parse from "parse/react-native";
class ClubsDialog extends Component {
  state = {
    title: "",
    description: ""
  };

  createClub = () => {
    const ClubObject = Parse.Object.extend("Clubs");
    let clubs = new ClubObject();
    const currentUser = Parse.User.current();
    let threads = [];
    var users = new Array();
    clubs.set("title", this.state.title);
    clubs.set("description", this.state.description);
    clubs.set("createdBy", currentUser.id);
    clubs.set("threadIds", threads);
    users = users.concat(currentUser.id.toString());
    clubs.set("userIds", users);
    if (currentUser) {
      // console.log(this.state.title);
      // console.log(this.state.description);
      clubs
        .save()
        .then(club => {
          // console.log("Club Added");
          this.setState({
            title: "",
            description: ""
          });
          // console.log(club);
          this.props.addToClub().then(() => {
            this.props.requestClose();
          });
        })
        .catch(error => {
          // console.log("Error " + error.code + " : " + error.message);
        });
    } else {
      // console.log("Not the Current User");
      // console.log(this.state.title);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Create New Club</Text>
        </View>
        <Form>
          <TextInput
            theme={{
              colors: {
                primary: "#000"
              }
            }}
            label={"New Title"}
            onChangeText={text => {
              this.setState({ title: text });
            }}
            placeholder={"Type the Title here"}
            mode="outlined"
            // style={{ marginBottom: 20 }}
          />
          <TextInput
            theme={{
              colors: {
                primary: "#000"
              }
            }}
            label={"New Description"}
            onChangeText={text => {
              this.setState({ description: text });
            }}
            placeholder={"Type the Description here"}
            mode="outlined"
            // style={{ height: 100, marginBottom: 15 }}
          />
          <Button
            theme={{
              colors: {
                primary: "#FFFFFF"
              }
            }}
            mode="contained"
            onPress={this.createClub}
            compact={true}
            contentStyle={styles.buttonInner}
            style={styles.button}
          >
            {"Create Club"}
          </Button>
          <Button
            theme={{
              colors: {
                primary: "#FFFFFF"
              }
            }}
            mode="contained"
            onPress={this.props.requestClose}
            compact={true}
            contentStyle={styles.buttonInner}
            style={styles.button}
          >
            {"Close"}
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
  form: {
    padding: 10
  },
  heading: {
    alignItems: "center"
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 10
  },
  buttonInner: {
    height: 50
  }
});

export default ClubsDialog;
