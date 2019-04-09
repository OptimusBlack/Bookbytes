import React from "react";
import { TouchableOpacity, DrawerActions, AsyncStorage } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import { Ionicons } from "@expo/vector-icons";
import Parse from "parse/react-native"


//Parse config done(based on info from PS folder)
//Import Parse from "parse/react-native" in other js files to "use" it

Parse.initialize("5874f2274cbb3dc45fc8743b4361871278e0c4c1","","6971ed566bb807cd7b7795dd075ea601b4c41e26")
Parse.serverURL = "http://18.222.127.61:80/parse"
Parse.setAsyncStorage(AsyncStorage)

const DrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: Login
    },
    HomeScreen: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: "Login",
    drawerWidth: 300
  }
);
const DrawerImage = ({ navigation }) => {
  if (!navigation.state.isDrawerOpen) {
    return <Ionicons name="bars" />;
  } else {
    return <Ionicons name="arrowleft" />;
  }
};

const StackNavigator = createStackNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: "ReactNavigation",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <DrawerImage style="styles.bar" navigation={navigation} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#333"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
