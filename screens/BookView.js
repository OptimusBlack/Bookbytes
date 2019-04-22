/* global console */
import React, { Component } from "react";
import { Card, Button, Paragraph } from "react-native-paper";
import { StyleSheet, UIManager, Alert } from "react-native";
import Parse from "parse/react-native";

const actions = ["Reading", "Completed", "On_hold", "Dropped"];

class BookView extends Component {
  constructor(props) {
    super(props);
    this.currentUser = Parse.User.current();
    this.bookListType = "None";
  }
  mapIdToIndex = function(Id, bookList) {
    for (let i = 0; i < bookList.length; i++) {
      if (Id == bookList[i].id) return i;
    }
    return -1;
  };
  componentDidMount() {
    if (!this.currentUser) {
      this.props.navigation.navigate("Login");
    }
    for (let action of actions) {
      if (this.currentUser.get(action).includes(this.props.book.id)) {
        this.bookListType = action;
        break;
      }
    }
  }
  displayMoveMenu = function(event) {
    UIManager.showPopupMenu(
      event.target,
      actions,
      () => {
        console.log("Popup Error");
      },
      (eventName, index) => {
        if (eventName != "itemSelected") {
          return;
        }
        if (this.bookListType != "None") {
          let arr = this.currentUser.get(actions[this.bookListType]);
          arr = arr.splice(this.mapIdToIndex(this.props.book.Id, arr), 1);
          this.currentUser.set(actions[this.bookListType], arr);
        }
        let arr = this.currentUser.get(actions[index]);
        arr.push(this.props.book.id);
        this.currentUser.set(actions[index], arr);
        this.currentUser
          .save()
          .then(() => {
            this.bookListType = actions[index];
            Alert.alert("Book moved to " + this.bookListType);
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    );
  };
  render() {
    return (
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: this.props.book.imageLinks.thumbnail }}
        />
        <Card.Title
          title={this.props.book.volumeInfo.title}
          subtitle={
            this.props.book.volumeInfo.authors != null
              ? this.props.book.volumeInfo.authors.join(", ")
              : "..."
          }
        />
        <Card.Content>
          <Paragraph>
            {"Published in " + this.props.book.publishedDate}
          </Paragraph>
          <Paragraph>{this.props.book.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button icon="add_circle" onPress={this.displayMoveMenu.bind(this)} />
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 30,
    paddingBottom: 20,
    paddingRight: 20,
    minHeight: 300
  },
  cardCover: {
    margin: 20
  }
});

export default BookView;
