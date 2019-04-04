import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "./screens/Login";
import HomeScreen from "./screens/Home";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    HomeScreen: {
      screen: HomeScreen
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
