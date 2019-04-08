import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import Settings from "./screens/Setting";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    HomeScreen: {
      screen: HomeScreen
    },
    SettingsScreen: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
