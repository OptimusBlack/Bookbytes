/* global console */
import React, { Component } from "react";
import { Card, Button, Paragraph } from "react-native-paper";
import { StyleSheet, UIManager, Alert, ScrollView, View } from "react-native";
import Parse from "parse/react-native";

const actions = ["Reading", "Completed", "On_hold", "Dropped"];

class BookView extends Component {
  constructor(props) {
    super(props);
    this.currentUser = Parse.User.current();
    this.bookListType = "None";
    this.state = {
      book: ""
    };
  }
  mapIdToIndex = function(Id, bookList) {
    for (let i = 0; i < bookList.length; i++) {
      if (Id == bookList[i].id) return i;
    }
    return -1;
  };
  componentWillMount() {
    if (!this.currentUser) {
      this.props.navigation.navigate("Login");
    }
    const { navigation } = this.props;
    const book = navigation.getParam("book", "");
    this.setState({
      book: book
    });
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
        for (let action of actions) {
          if (this.currentUser.get(action).indexOf(this.state.book.id) > -1) {
            this.bookListType = action;
          }
          this.bookListType = "None";
        }
        if (this.bookListType != "None") {
          let arr = this.currentUser.get(actions[this.bookListType]);
          arr.splice(this.mapIdToIndex(this.state.book.id, arr), 1);
          this.currentUser.set(actions[this.bookListType], arr);
        }
        let arr = this.currentUser.get(actions[index]);
        arr.push(this.state.book.id);
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
      <ScrollView>
        <Card style={styles.card}>
          <View style={{ alignItems: "center" }}>
            <Card.Cover
              style={styles.cardCover}
              source={{
                uri:
                  this.state.book.volumeInfo.imageLinks != null
                    ? this.state.book.volumeInfo.imageLinks.thumbnail
                    : "https://vignette.wikia.nocookie.net/marveldatabase/images/3/3f/No_Image_Cover.jpg"
              }}
            />
          </View>
          <Card.Title
            title={this.state.book.volumeInfo.title}
            subtitle={
              this.state.book.volumeInfo.authors != null
                ? this.state.book.volumeInfo.authors.join(", ")
                : "..."
            }
          />
          <Card.Content>
            <Paragraph>
              {"Published in " + this.state.book.volumeInfo.publishedDate}
            </Paragraph>
            <Paragraph numberOfLines={8}>
              {this.state.book.volumeInfo.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={{ marginTop: 30 }}>
            <Button
              theme={{
                colors: {
                  primary: "#000"
                }
              }}
              icon="add"
              onPress={this.displayMoveMenu.bind(this)}
              style={styles.button}
              contentStyle={styles.buttonInner}
            />
          </Card.Actions>
        </Card>
      </ScrollView>
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
  button: {
    marginTop: 50,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  buttonInner: {
    height: 30,
    width: 40
  },
  cardCover: {
    margin: 20,
    width: 150,
    height: 250
  }
});

export default BookView;
