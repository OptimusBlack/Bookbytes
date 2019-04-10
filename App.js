import React from "react";
import { TouchableOpacity, DrawerActions } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import { Ionicons } from "@expo/vector-icons";

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
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
