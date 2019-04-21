import React, { Component } from "react";
import { Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
import data from ""; //finish this
// import FAB from "react-native-fab";
//<FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {console.log("FAB pressed")}} visible={true} iconTextComponent={<Icon name="all-out"/>} />

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: data.items //json data type
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      // data = {this.state.dataSource}
      // renderItem={{item}}=>
      // static navigationOptions={
      // 	title = item.title
      // }
      <ScrollView>
        {/* <Image
          source={{ uri: item.thumbnail }}
          style={{ width: 100, height: 100 }}
        />
        <Text> item.description </Text> */}
      </ScrollView>
    );

    // );
  }
}
export default BookPage;
