import React from 'react';
import { StyleSheet, Text } from 'react-native';

import firebase from '../../../FirebaseInit';
const firebaseAuth = firebase.auth();

export default function SignInScreen() {
  const signInAsGuest = async () => {
    try {
      await firebaseAuth.signInAnonymously()
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Text onPress={signInAsGuest}>Continue as guest</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
