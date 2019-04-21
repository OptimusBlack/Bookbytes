import React, { Component } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

class Club extends React.PureComponent {
  state = {
    title: this.props.item.title,
    description: this.props.item.description,
    comments: this.props.item.threadIds.length,
    club_id: this.props.item.objectId
  };

  render() {
    return (
      <Card
        key={this.props.item.objectId}
        style={styles.card}
        onPress={() => {
          this.props.navigateToClub(this.state.club_id);
        }}
      >
        <Card.Title
          title={this.state.title}
          subtitle={this.state.description}
        />
        <Card.Content>
          <Text>{`${this.state.comments} threads`}</Text>
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

export default Club;
