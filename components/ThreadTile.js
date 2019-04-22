import React, { Component } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { PropTypes } from "prop-types";
import Parse from "parse/react-native";
import { withNavigation } from "react-navigation";

class ThreadTile extends React.PureComponent {
  state = {
    title: this.props.item.title,
    description: this.props.item.description,
    comments: this.props.item.commentIds.length,
    id: this.props.item.objectId
  };

  navigateToThread = () => {
    const thread = Parse.Object.extend("Thread");
    const query = new Parse.Query(thread);
    query.equalTo("objectId", this.state.id);
    query.find().then(results => {
      this.props.navigation.navigate("Comment", {
        thread: results[0]
      });
    });
  };

  render() {
    return (
      <Card
        key={this.state.id}
        style={styles.card}
        onPress={this.navigateToThread}
      >
        <Card.Title
          title={this.state.title}
          subtitle={this.state.description}
        />
        <Card.Content>
          <Text>{`${this.state.comments} comments`}</Text>
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },
  cardCover: {
    width: 50,
    height: 80,
    marginTop: 40
  },
  desc: {
    paddingLeft: 73
  }
});

ThreadTile.propTypes = {
  item: PropTypes.object.isRequired
};

export default withNavigation(ThreadTile);
