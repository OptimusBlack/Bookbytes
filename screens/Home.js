import React, { Component } from "react";
import { BottomNavigation } from "react-native-paper";
import ClubsRoute from "../components/ClubsRoute";
import BooksRoute from "../components/BooksRoute";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "books", title: "Books", icon: "book" },
        { key: "clubs", title: "Clubs", icon: "people" }
      ]
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    books: BooksRoute,
    clubs: ClubsRoute
  });

  render() {
    return (
      <BottomNavigation
        theme={{
          colors: {
            primary: "#FFFFFF"
          }
        }}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

export default HomeScreen;
