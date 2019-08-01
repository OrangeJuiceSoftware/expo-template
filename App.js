import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import firebase from './FirebaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';

import HomeScreen from './src/screenComponents/app/HomeScreen';
import SecondScreen from './src/screenComponents/app/SecondScreen';
import SignInScreen from './src/screenComponents/authentication/SignInScreen';
import LoadingScreen from './src/screenComponents/LoadingScreen';

import WelcomeModal from './src/screenComponents/modals/Welcome';

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home Screen'
    }
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: {
      title: 'Second Screen'
    }
  }
}, {
  initialRouteName: 'Home'
})

const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});

const RootStack = createStackNavigator({
  App: {
    screen: AppStack
  },
  MyModal: {
    screen: WelcomeModal
  },
}, {
  mode: 'modal',
  headerMode: 'none'
});

const AppContainer = createAppContainer(RootStack);
const AuthContainer = createAppContainer(AuthStack);

export default () => {
  const [user, initialising, error] = useAuthState(firebase.auth());

  if (initialising) {
    return <LoadingScreen />;
  }

  if (user) {
    return <AppContainer />;
  }

  return <AuthContainer />;
}
