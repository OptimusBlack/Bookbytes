import React, { Component } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { PropTypes } from "prop-types";

class Thread extends React.PureComponent {
  state = {
    thread: null
  };

  componentWillMount() {
    const thread = this.props.navigation.getParam("thread");
    this.setState({
      thread: thread
    });
  }

  render() {
    return (
      <Card key={this.state.thread.objectId} style={styles.card}>
        <Card.Title
          title={this.state.thread.title}
          subtitle={this.state.thread.description}
        />
        <Card.Content>
          <Text>{`${this.state.thread.commentIds.length} comments`}</Text>
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

Thread.propTypes = {};

export default Thread;
