/* global console */
import React, { Component } from "react";
import { StyleSheet, SectionList, Alert, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import CommentSend from "../components/CommentSend";
import Parse from "parse/react-native";
import { Container, Content } from "native-base";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.thread = this.props.navigation.getParam("thread");
    this.currentUser = Parse.User.current();
    this.state = {
      messageText: "",
      comments: []
    };
  }

  mapIdToUserName(Id, users) {
    for (let user of users) {
      if (user.id === Id) return user.get("username");
    }
    return "Unknown";
  }
  mapIdToCommentText(Id, comments) {
    for (let comment of comments) {
      if (comment.id === Id) {
        return comment.get("commentText");
      }
    }
    return "Data cannot be retrieved ATM";
  }
  messageChange = function(text) {
    this.setState({ messageText: text });
  };
  sendMessage = function() {
    if (this.state.messageText === "") {
      Alert.alert("Enter a non-empty message");
      return;
    }
    let parseComment = new Parse.Object("Comment");
    let currentMessage = this.state.messageText;
    parseComment.set("createdBy", this.currentUser.id);
    parseComment.set("commentText", currentMessage);
    parseComment
      .save()
      .then(savedObj => {
        let commIds = this.thread.get("commentIds");
        commIds.push(savedObj.id);
        this.thread.set("commentIds", commIds);
        return this.thread.save();
      })
      .then(() => {
        this.setState({
          comments: [
            ...this.state.comments,
            { name: this.currentUser.get("username"), comment: currentMessage }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    if (!this.currentUser) {
      this.props.navigation.navigate("Login");
    }
    let commentIds = this.thread.commentIds;
    let parseCommentUserIds = new Parse.Query("Comment");
    parseCommentUserIds.containedIn("objectId", this.thread.commentIds);
    parseCommentUserIds
      .find()
      .then(comments => {
        commentIds = commentIds.map((Id, index) => [
          Id,
          /*User ID*/ comments[index],
          this.mapIdToCommentText(Id, comments)
        ]);
        let userIds = commentIds.map(value => value[1]);
        let parseUserNameFromUserIds = new Parse.Query(Parse.User);
        parseUserNameFromUserIds.containedIn("objectId", userIds);
        return parseUserNameFromUserIds.find();
      })
      .then(users => {
        commentIds = commentIds.map(value => [
          value[0],
          value[1],
          this.mapIdToUserName(value[1], users),
          value[2]
        ]);
        this.setState({
          comments: commentIds.map(value => ({
            name: value[2],
            comment: value[3]
          }))
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={{ justifyContent: "space-between" }}>
          <SectionList
            sections={[
              { title: "ThreadTitle", data: [this.thread.title] },
              { title: "Comments", data: this.state.comments }
            ]}
            renderItem={({ item, section }) =>
              section.title === "ThreadTitle" ? (
                <Card>
                  <View style={{ justifyContent: "center", flex: 1 }}>
                    <Card.Content>
                      <Title style={{ fontSize: 25 }}>{item}</Title>
                    </Card.Content>
                  </View>
                </Card>
              ) : (
                <Card>
                  <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>{item.comment}</Paragraph>
                  </Card.Content>
                </Card>
              )
            }
          />
          <CommentSend
            style={styles.sendComment}
            messageChange={this.messageChange.bind(this)}
            sendMessage={this.sendMessage.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionList: {
    height: "75%",
    padding: 4
  },
  sendComment: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 4
  }
});

export default Comment;
