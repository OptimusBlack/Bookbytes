import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { Parse } from "parse/react-native";
import ThreadTile from "../components/ThreadTile";
import { Card } from "react-native-paper";

class ThreadList extends Component {
  /**
   * Thread list for a club. Please navigate with the parameter: club_id
   * @type {{club_id: string, threads: Array, loading: boolean, club_title: string}}
   */
  state = {
    club_id: "",
    club_title: "",
    club_description: "",
    threads: [],
    loading: true
  };

  componentWillMount() {
    /**
     * When the component mounts, get the club id from the props and fetch the
     * threads in the club
     */
    const { navigation } = this.props;
    const club_id = navigation.getParam("club_id", "");
    // Fetch threads
    this.fetchThreads(club_id).then(threads => {
      threads = JSON.parse(JSON.stringify(threads));
      this.setState({
        club_id: club_id,
        threads,
        loading: false
      });
    });
  }

  fetchThreads = async club_id => {
    const club_class_object = Parse.Object.extend("Clubs");
    const thread_class_object = Parse.Object.extend("Thread");
    const query = new Parse.Query(club_class_object);
    query.equalTo("objectId", club_id);

    return await query.find().then(async result => {
      const club_object = JSON.parse(JSON.stringify(result[0]));
      const thread_query = new Parse.Query(thread_class_object);

      this.setState({
        club_title: club_object.title,
        club_description: club_object.description
      });

      thread_query.containedIn("objectId", club_object.threadIds);
      return await thread_query.find().then(results => {
        return results;
      });
    });
  };

  render() {
    return (
      <View>
        <Card>
          <Card.Title title={this.state.club_title} />
          <Card.Content>
            <Text>{this.state.club_description}</Text>
          </Card.Content>
        </Card>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={this.state.threads}
          renderItem={({ item }) => <ThreadTile item={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 90 }}
        />
      </View>
    );
  }
}

export default ThreadList;
