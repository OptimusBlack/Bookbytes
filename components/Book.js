import React, { Component } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

class Book extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book
    };
  }
  render() {
    return (
      <Card style={styles.card}>
        <Card.Title
          title={this.props.book.volumeInfo.title}
          subtitle={
            this.props.book.volumeInfo.authors != null ? this.props.book.volumeInfo.authors.join(", ") : "..."
          }
          left={props => (
            <Card.Cover
              {...props}
              source={{ uri: this.props.book.volumeInfo.imageLinks != null ? this.props.book.volumeInfo.imageLinks.smallThumbnail : "https://vignette.wikia.nocookie.net/marveldatabase/images/3/3f/No_Image_Cover.jpg" }}
              style={styles.cardCover}
            />
          )}
        />
        <Text numberOfLines={4} style={styles.desc}>
          {this.props.book.volumeInfo.description != null
            ? this.props.book.volumeInfo.description
            : "No description..."}
        </Text>
        {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 20,
    paddingRight: 20,
    minHeight: 130
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

export default Book;
