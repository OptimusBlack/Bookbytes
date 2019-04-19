import React from "react";
import { AsyncStorage } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import Settings from "./screens/Setting";
import Parse from "parse/react-native";
import { Appbar } from "react-native-paper";
import ThreadList from "./screens/ThreadList";

class NavigationDrawerStructure extends React.Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <Appbar.Header
        theme={{
          colors: {
            primary: "#FFFFFF"
          }
        }}
      >
        <Appbar.Action icon="menu" onPress={this.toggleDrawer.bind(this)} />
        <Appbar.Content title="Bookbytes" />
      </Appbar.Header>
    );
  }
}

//Parse config done(based on info from PS folder)
//Import Parse from "parse/react-native" in other js files to "use" it

Parse.initialize(
  "5874f2274cbb3dc45fc8743b4361871278e0c4c1",
  "",
  "6971ed566bb807cd7b7795dd075ea601b4c41e26"
);
Parse.serverURL = "http://18.222.127.61:80/parse";
Parse.setAsyncStorage(AsyncStorage);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Home",
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
        header: <NavigationDrawerStructure navigationProps={navigation} />
      })
    },
    Threads: {
      screen: ThreadList,
      navigationOptions: props => {
        return {
          title: "Bookbytes"
        };
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);
const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
