import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import firebase from './FirebaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';

import HomeScreen from "./screenComponents/app/HomeScreen";
import SignInScreen from "./screenComponents/authentication/SignInScreen";
import LoadingScreen from "./screenComponents/LoadingScreen";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'hi',
      }
    },
  },
  {
    initialRouteName: 'Home'
  }
)

const AuthStack = createStackNavigator({ 
  SignIn: SignInScreen 
});

const RootStack = createStackNavigator(
  {
    App: {
      screen: AppStack,
    },
    MyModal: {
      screen: LoadingScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);
const AuthContainer = createAppContainer(AuthStack);

export default function App () {
  const [user, initialising, error] = useAuthState(firebase.auth());

  if (initialising) {
    return <LoadingScreen/>
  }

  if (user) {
    return <AppContainer/>
  }

  return <AuthContainer/>
}
