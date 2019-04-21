import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight
} from "react-native";
import { Parse } from "parse/react-native";
import ThreadTile from "../components/ThreadTile";
import { Card } from "react-native-paper";
import ActionButton from "react-native-action-button";
import CreateThread from "../components/CreateThread";

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
    loading: true,
    modalVisible: false
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

  addThreadToClub = async threadId => {
    const club_class_object = Parse.Object.extend("Clubs");
    const query = new Parse.Query(club_class_object);
    query.equalTo("objectId", this.state.club_id);
    return await query.find().then(results => {
      const club_object = results[0];
      let threadIds = club_object.get("threadIds");
      threadIds.push(threadId);
      club_object.set("threadIds", threadIds);
      club_object.save().then(club => {
        const threadIds = club.get("threadIds");
        const thread_class_object = Parse.Object.extend("Thread");
        const thread_query = new Parse.Query(thread_class_object);
        thread_query.containedIn("objectId", threadIds);
        thread_query.find().then(threads => {
          threads = JSON.parse(JSON.stringify(threads));
          this.setState({
            threads: threads
          });
        });
      });
    });
  };

  render() {
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
          <CreateThread
            requestClose={() => {
              this.setState({ modalVisible: false });
            }}
            addToClub={this.addThreadToClub}
          />
        </Modal>

        <Card>
          <Card.Title title={this.state.club_title} />
          <Card.Content>
            <Text>{this.state.club_description}</Text>
          </Card.Content>
        </Card>

        <FlatList
          data={this.state.threads}
          renderItem={({ item }) => <ThreadTile item={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 90 }}
        />

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
  container: {
    flex: 1
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});

export default ThreadList;
