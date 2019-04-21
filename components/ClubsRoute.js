import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Parse } from "parse/lib/react-native/Parse";
import { View } from "native-base";
import { Searchbar } from "react-native-paper";
import { withNavigation } from "react-navigation";
import Club from "./Club";

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
  componentWillMount() {
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
    //console.log("Thissss" + currentUser.id);
    query.limit(10);
    return await query.find().then(async result => {
      return result;
    });
  };

  searchClubs = () => {
    const club_class_object = Parse.Object.extend("Clubs");
    const query = new Parse.Query(club_class_object);
    query.fullText("title", this.state.firstQuery);
    query.limit(10);
    return query
      .find()
      .then(result => {
        return result;
      })
      .catch(err => {
        //console.log(err.message);
      });
  };

  handleClubSearch() {
    if (this.state.firstQuery === "") {
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
          //console.log(clubs);
          this.setState({
            clubData: clubs
          });
        })
        .catch(err => {
          //console.log("Error " + err.code + ": " + err.message);
        });
    }
  }

  handleSearch = () => {
    this.flatListRef.scrollToOffset({ offset: 0 });
    //console.log(this.state.firstQuery);
    this.handleClubSearch();
  };

  navigateToClub = clubId => {
    this.props.navigation.navigate("Threads", { club_id: clubId });
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
          renderItem={({ item }) => (
            <Club item={item} navigateToClub={this.navigateToClub} />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 90 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    padding: 20
  }
});

export default withNavigation(ClubsRoute);
