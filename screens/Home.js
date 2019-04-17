import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Searchbar, BottomNavigation } from "react-native-paper";
import { View } from "native-base";

class BooksRoute extends Component {
  state = {
    firstQuery: ""
  };
  render() {
    const { firstQuery } = this.state;
    return (
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search books"
          onChangeText={query => {
            this.setState({ firstQuery: query });
          }}
          value={firstQuery}
        />
      </View>
    );
  }
}

class ClubsRoute extends Component {
  state = {
    firstQuery: ""
  };
  render() {
    const { firstQuery } = this.state;
    return (
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search clubs"
          onChangeText={query => {
            this.setState({ firstQuery: query });
          }}
          value={firstQuery}
        />
      </View>
    );
  }
}

class HomeScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "books", title: "Books", icon: "book" },
      { key: "clubs", title: "Clubs", icon: "people" }
    ]
  };

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

const styles = StyleSheet.create({
  searchBar: {
    padding: 20
  }
});

export default HomeScreen;
