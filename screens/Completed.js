/* global console, fetch */

import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  UIManager,
  TouchableOpacity,
  Text
} from "react-native";
import { Container, Content } from "native-base";
import Parse from "parse/react-native";
import Book from "../components/Book";

const actionsToRead = ["Reading", "On_hold", "Dropped"];
class Completed extends Component {
  constructor(props) {
    super(props);
    this.currentUser = Parse.User.current();
    this.state = {
      booksData: []
    };
  }
  componentDidMount() {
    if (!this.currentUser) {
      this.props.navigation.navigate("Login");
    }

    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ booksData: [] });

        for (let bookId of this.currentUser.get("Completed")) {
          this.fetchBooks(bookId);
        }
      }
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  //https://www.googleapis.com/books/v1/volumes?q=id:buc0AAAAMAAJ
  fetchBooks = function(bookId) {
    let queryURL = "https://www.googleapis.com/books/v1/volumes/";
    queryURL += bookId;
    fetch(queryURL)
      .then(response => response.json())

      .then(responseJson => {
        this.setState(prevState => ({
          booksData: [...prevState.booksData, responseJson]
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  navigateToBook = book => {
    this.props.navigation.navigate("BookDetails", { book: book });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.header}> Read </Text>
          <FlatList
            data={this.state.booksData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onLongPress={event => {
                  UIManager.showPopupMenu(
                    event.target,
                    actionsToRead,
                    () => {
                      console.log("Popup Error");
                    },
                    (eventName, index) => {
                      if (eventName !== "itemSelected") {
                        return;
                      }
                      if (index == 0) {
                        // Move to Reading
                        let parseUser = this.currentUser;
                        let bookIds = parseUser.get("Completed");
                        let bookindex = bookIds.indexOf(item.id);
                        if (bookindex >= 0) {
                          let ReadingbookIds = parseUser.get(
                            actionsToRead[index]
                          );
                          ReadingbookIds.push(bookIds[bookindex]);
                          bookIds.splice(bookindex, 1);
                          parseUser.set("Completed", bookIds);
                          parseUser.set(actionsToRead[index], ReadingbookIds);
                          parseUser
                            .save()
                            .then(() => {
                              let booksData = [...this.state.booksData];
                              for (let bookdata of booksData) {
                                if (bookdata.id == item.id) {
                                  booksData.splice(
                                    booksData.indexOf(bookdata),
                                    1
                                  );
                                  break;
                                }
                              }
                              this.setState({ booksData: booksData });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                      } else if (index == 1) {
                        // Move to On_hold
                        let parseUser = this.currentUser;
                        let bookIds = parseUser.get("Completed");
                        let bookindex = bookIds.indexOf(item.id);
                        if (bookindex >= 0) {
                          let OnholdbookIds = parseUser.get(
                            actionsToRead[index]
                          );
                          OnholdbookIds.push(bookIds[bookindex]);
                          bookIds.splice(bookindex, 1);
                          parseUser.set("Completed", bookIds);
                          parseUser.set(actionsToRead[index], OnholdbookIds);
                          parseUser
                            .save()
                            .then(() => {
                              let booksData = [...this.state.booksData];
                              for (let bookdata of booksData) {
                                if (bookdata.id == item.id) {
                                  booksData.splice(
                                    booksData.indexOf(bookdata),
                                    1
                                  );
                                  break;
                                }
                              }
                              this.setState({ booksData: booksData });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                      } else {
                        // Move to Dropped
                        let parseUser = this.currentUser;
                        let bookIds = parseUser.get("Completed");
                        let bookindex = bookIds.indexOf(item.id);
                        if (bookindex >= 0) {
                          let DroppedbookIds = parseUser.get(
                            actionsToRead[index]
                          );
                          DroppedbookIds.push(bookIds[bookindex]);
                          bookIds.splice(bookindex, 1);
                          parseUser.set("Completed", bookIds);
                          parseUser.set(actionsToRead[index], DroppedbookIds);
                          parseUser
                            .save()
                            .then(() => {
                              let booksData = [...this.state.booksData];
                              for (let bookdata of booksData) {
                                if (bookdata.id == item.id) {
                                  booksData.splice(
                                    booksData.indexOf(bookdata),
                                    1
                                  );
                                  break;
                                }
                              }
                              this.setState({ booksData: booksData });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                      }
                    }
                  );
                }}
              >
                <Book book={item} navigateToBook={this.navigateToBook} />
              </TouchableOpacity>
            )}
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
  listItem: {
    margin: 10
  },
  header: {
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default Completed;
