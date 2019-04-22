import React from "react";
import { View } from "react-native";
import Parse from "parse/react-native";

class Logout extends React.Component {
  componentDidMount() {
    const currentUser = Parse.User.current();
    // console.log(currentUser);
    Parse.User.logOut()
      .then(() => {
        // console.log("Logout");
        this.props.navigation.navigate("Login");
      })
      .catch(err => {
        // console.log(err.message);
      });
  }

  render() {
    return <View />;
  }
}

export default Logout;
