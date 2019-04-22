/* global console */
import React, { Component } from "react";
import { StyleSheet, SectionList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { CommentSend } from "../components/CommentSend";
import Parse from "parse/react-native";
import { Container, Content } from "native-base";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.thread = this.props.thread;
    this.currentUser = Parse.User.current();
    this.state = {
      messageText: "",
      comments: []
    };
  }
  mapIdToUserName(Id, users) {
    for (let user of users) {
      if (user.id == Id) return user.get("username");
    }
    return "Unknown";
  }
  mapIdToCommentText(Id, comments) {
    for (let comment of comments) {
      if (comment.id == Id) {
        return comment.get("commentText");
      }
    }
    return "Data cannot be retrieved ATM";
  }
  messageChange = function(text) {
    this.setState({ messageText: text });
  };
  sendMessage = function() {
    let parseComment = new Parse.Object("Comment");
    let currentMessage = this.state.messageText;
    parseComment.set("createdBy", this.currentUser.id);
    parseComment.set("commentText", currentMessage);
    parseComment
      .save()
      .then(savedObj => {
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
        <Content>
          <SectionList
            sections={[
              { title: "ThreadTitle", data: [this.props.thread.title] },
              { title: "Comments", data: "x" }
            ]}
            renderItem={({ item, section }) =>
              section.title == "ThreadTitle" ? (
                <Card>
                  <Card.Content>
                    <Title>{item}</Title>
                  </Card.Content>
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
    flex: 1,
    alignItems: "center"
  },
  sectionList: {
    maxHeight: "90%",
    padding: 4
  },
  sendComment: {
    paddingBottom: 4
  }
});

export default Comment;
