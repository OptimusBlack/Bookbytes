import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Text, StyleSheet } from "react-native";
import Club from "../components/ClubsDialog";
import { withNavigation } from "react-navigation";
import Parse from "parse/react-native";

class NewClub extends Component {
  state = {
    title: "",
    description: ""
  };

  title = function(text) {
    this.setState({ ...this.state, title: text });
  };

  desc = function(text) {
    this.setState({ ...this.state, description: text });
  };

  createClub = function() {
    const ClubObject = Parse.Object.extend("Clubs");
    const clubs = new ClubObject();
    let currentUser = Parse.User.current();
    let threads = [];
    var users = new Array();
    clubs.set("title", this.state.title);
    clubs.set("description", this.state.description);
    clubs.set("createdBy", currentUser.id);
    clubs.set("threadIds", threads);
    users = users.concat(currentUser.id.toString());
    clubs.set("userIds", users);
    if (currentUser) {
      //   console.log(this.state.title);
      //   console.log(this.state.description);
      clubs
        .save()
        .then(() => {
          //   console.log("Club Added");
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          //   console.log("Error " + error.code + " : " + error.message);
        });
    } else {
      //   console.log("Not the Current User");
      //   console.log(this.state.title);
    }
  };

  requestClose = function() {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Create new club</Text>
        </View>
        <Content
          style={styles.loginForm}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <Club
            title={this.title.bind(this)}
            desc={this.desc.bind(this)}
            createClub={this.createClub.bind(this)}
            requestClose={this.requestClose.bind(this)}
          />
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
    width: "80%"
  },
  heading: {
    alignItems: "center"
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20
  }
});

export default withNavigation(NewClub);
