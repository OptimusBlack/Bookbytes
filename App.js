/* global require */
import React from "react";
import { TouchableOpacity, DrawerActions, AsyncStorage, Image, View } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import { PropTypes } from "prop-types";
import Parse from "parse/react-native"

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


//Parse config done(based on info from PS folder)
//Import Parse from "parse/react-native" in other js files to "use" it

Parse.initialize("5874f2274cbb3dc45fc8743b4361871278e0c4c1","","6971ed566bb807cd7b7795dd075ea601b4c41e26")
Parse.serverURL = "http://18.222.127.61:80/parse"
Parse.setAsyncStorage(AsyncStorage)

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
