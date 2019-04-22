import React from "react";
import { AsyncStorage } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import Login from "./screens/Login";
import Complete from "./screens/Completed";
import Drop from "./screens/Dropped";
import Hold from "./screens/On_hold";
import ToRead from "./screens/ToRead";
import HomeScreen from "./screens/Home";
import Settings from "./screens/Setting";
import Parse from "parse/react-native";
import { Appbar } from "react-native-paper";
import ThreadList from "./screens/ThreadList";
import Thread from "./screens/Thread";
import Logout from "./components/Logout";
import Comment from "./screens/Comment";

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
        <Appbar.Content title={this.props.titleText} />
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
    ToRead: {
      screen: ToRead
    },
    Complete: {
      screen: Complete
    },
    Drop: {
      screen: Drop
    },
    Hold: {
      screen: Hold
    },
    Settings: {
      screen: Settings
    },
    Logout: {
      screen: Logout
    }
  },
  {
    initialRouteName: "Home",
    drawerWidth: 300
  }
);

const StackNavigator = createStackNavigator({
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
        title: "Threads"
      };
    }
  },
  Thread: {
    screen: Thread,
    navigationOptions: props => {
      return {
        title: "Threads"
      };
    }
  },
  Comment: {
    screen: Comment,
    navigationOptions: () => {
      return {
        title: "Comments"
      };
    }
  },
  ToRead: {
    screen: ToRead
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: "Login"
      })
    },
    App: StackNavigator
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
