import React, {useEffect} from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import firebase from './FirebaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';

import HomeScreen from './src/screenComponents/app/HomeScreen';
import SecondScreen from './src/screenComponents/app/SecondScreen';
import SignInScreen from './src/screenComponents/authentication/SignInScreen';
import LoadingScreen from './src/screenComponents/LoadingScreen';

import WelcomeModal from './src/screenComponents/modals/Welcome';

import { Root, Container, StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/custom';

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
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Sign In',
    }
  }
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

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // TODO save this somewhere
  console.log(token);
}

export default () => {
  const [user, initialising, error] = useAuthState(firebase.auth());

  // This is here for illustrative purposes
  // We advise calling this at a more convinient time for the user
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [])

  if (initialising) {
    return <LoadingScreen/>;
  }

  if (user) {
    return (    
      <StyleProvider style={getTheme(material)}>
        <Root>
          <Container>
            <AppContainer/>
          </Container>
        </Root>
      </StyleProvider>
    )
  }

  return (    
    <StyleProvider style={getTheme(material)}>
      <Root>
        <Container>
          <AuthContainer/>
        </Container>
      </Root>
    </StyleProvider>
  )
}
