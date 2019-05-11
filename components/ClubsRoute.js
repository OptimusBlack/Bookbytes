import React, { Component } from "react";
import { StyleSheet, FlatList, Modal } from "react-native";
import { Parse } from "parse/lib/react-native/Parse";
import { View } from "native-base";
import { Searchbar } from "react-native-paper";
import ActionButton from "react-native-action-button";
import { withNavigation } from "react-navigation";
import Club from "./Club";
import CreateClub from "../components/ClubsDialog";

class ClubsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: "",
      user: "",
      clubData: [],
      loading: true,
      modalVisible: false
    };
  }

  /**
   * For debugging data received.
   */

  // componentWillUpdate(){
  // 	console.log("Test Results");
  // 	console.log(this.state.clubData);
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
        clubData: clubs,
        loading: false
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
        //console.log(err.message);
      });
  };

  handleClubSearch = () => {
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
  };

  handleSearch = () => {
    this.flatListRef.scrollToOffset({ offset: 0 });
    this.setState({
      clubData: []
    });
    this.handleClubSearch();
  };

  addClub = async () => {
    const currentUser = Parse.User.current();
    const club_class_object = Parse.Object.extend("Clubs");
    const query = new Parse.Query(club_class_object);
    query.equalTo("userIds", currentUser.id);
    //console.log("Thissss" + currentUser.id);
    query.limit(10);
    return await query.find().then(clubs => {
      clubs = JSON.parse(JSON.stringify(clubs));
      this.setState({
        user: currentUser.id,
        clubData: clubs
      });
    });
  };

  navigateToClub = clubId => {
    this.props.navigation.navigate("Threads", { club_id: clubId });
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          presentationStyle={"pageSheet"}
          onRequestClose={() => {
            this.setState({
              modalVisible: false
            });
          }}
        >
          <CreateClub
            requestClose={() => {
              this.setState({ modalVisible: false });
            }}
            addToClub={this.addClub}
          />
        </Modal>
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
        <View style={{ minHeight: "85%" }}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            data={this.state.clubData}
            renderItem={({ item }) => (
              <Club item={item} navigateToClub={this.navigateToClub} />
            )}
            keyExtractor={(item, index) => item.objectId.toString()}
            style={{ marginBottom: 90 }}
          />
        </View>
        <ActionButton
          style={styles.fab}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    padding: 20
  },
  container: {
    flex: 1
  },
  fab: {
    position: "absolute",
    // margin: 16,
    right: 0,
    bottom: 0
  }
});

export default withNavigation(ClubsRoute);
