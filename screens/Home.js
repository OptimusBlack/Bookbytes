/* global fetch, console */
import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { Searchbar, BottomNavigation } from "react-native-paper";
import { View } from "native-base";
import { Parse, User } from "parse/react-native";
import Book from "../components/Book";
import Club from "../components/Club";
import Parse from "parse/react-native";

class BooksRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: "",
      booksData: [],
      scrollIdx: 0
    };
    this.flatListRef = React.createRef();
  }

  fetchBooks = function() {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?";
    var query = 'q="' + this.state.firstQuery + '"';
    var type = "&printType=books";
    var lang = '&langRestrict="en"';
    //var filter = '&filter=full';

    queryURL += query + type + lang;

    fetch(queryURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          booksData: responseJson.items
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchMoreBooks = function() {
    var newIdx = this.state.scrollIdx + 10;
    this.setState({
      scrollIdx: newIdx
    });
    var queryURL = "https://www.googleapis.com/books/v1/volumes?";
    var query = 'q="' + this.state.firstQuery + '"';
    var type = "&printType=books";
    var lang = '&langRestrict="en"';
    var startIdx = "&startIndex=" + newIdx;

    queryURL += query + type + lang + startIdx;

    fetch(queryURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          booksData: this.state.booksData.concat(responseJson.items)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchBooks();
  }

  handleSearch = () => {
    this.flatListRef.scrollToOffset({ offset: 0 });
    this.fetchBooks();
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <View>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Search books"
            onChangeText={query => {
              this.setState({ firstQuery: query });
            }}
            value={firstQuery}
            onSubmitEditing={this.handleSearch}
          />
        </View>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={this.state.booksData}
          renderItem={({ item }) => <Book book={item} />}
          style={{ marginBottom: 90 }}
          onEndReached={this.fetchMoreBooks.bind(this)}
        />
      </View>
    );
  }
}
class ClubsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: "",
      user: "",
      clubData: []
    };
  }

  /**
   * For debugging data received.
   */
  // componentDidUpdate(){
  // 	console.log("Test Results");
  // 	console.log(this.state.clubData);
  // 	console.log(this.state.user);
  // }

  /**
   * Retrieve current clubs created by the user as well as the ones
   * he is  member of.
   */
  componentDidMount() {
    let currentUser = Parse.User.current();
    // Fetch Clubs
    this.fetchClubs(currentUser).then(clubs => {
      clubs = JSON.parse(JSON.stringify(clubs));
      this.setState({
        user: currentUser.id,
        clubData: clubs
      });
    });
  }

  fetchClubs = async currentUser => {
    const club_class_object = Parse.Object.extend("Clubs");
    const query = new Parse.Query(club_class_object);
    query.equalTo("userIds", currentUser.id);
    console.log("Thissss" + currentUser.id);
    query.limit(10);
    return await query.find().then(async result => {
      return result;
    });
  };

  searchClubs = async () => {
    const club_class_object = Parse.Object.extend("Clubs");
    const query = new Parse.Query(club_class_object);
    query.fullText("title", this.state.firstQuery);
    query.limit(10);
    return await query
      .find()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  handleClubSearch() {
    if (this.state.firstQuery == "") {
      let currentUser = Parse.User.current();
      this.fetchClubs(currentUser).then(clubs => {
        clubs = JSON.parse(JSON.stringify(clubs));
        this.setState({
          user: currentUser.id,
          clubData: clubs
        });
      });
    } else {
      this.searchClubs()
        .then(clubs => {
          clubs = JSON.parse(JSON.stringify(clubs));
          this.setState({
            clubData: clubs
          });
        })
        .catch(err => {
          console.log("Error " + err.code + ": " + err.message);
        });
    }
  }

  handleSearch = () => {
    this.flatListRef.scrollToOffset({ offset: 0 });
    console.log(this.state.firstQuery);
    this.setState({
      clubData: []
    });
    this.handleClubSearch();
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <View>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Search clubs"
            onChangeText={query => {
              this.setState({ firstQuery: query });
            }}
            value={firstQuery}
            onSubmitEditing={this.handleSearch}
          />
        </View>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={this.state.clubData}
          extraData={this.state.clubData}
          renderItem={({ item }) => <Club item={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 90 }}
        />
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  searchBar: {
    padding: 20
  }
});

export default HomeScreen;
