/* global require */
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import { PropTypes } from "prop-types";

class NavigationDrawerStructure extends React.Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("./assets/menu.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: "HomeScreen",
    drawerWidth: 300
  }
);

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: ({ navigation }) => ({
        title: "Bookbytes",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#FF9800"
        },
        headerTintColor: "#fff"
      })
    }
  },
  {
    initialRouteName: "Login"
  }
);
const AppContainer = createAppContainer(StackNavigator);

// App.propTypes = {
//   navigationProps: PropTypes.object.isRequired
// };

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
