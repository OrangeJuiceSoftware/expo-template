import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../../../FirebaseInit'
const firestore = firebase.firestore();

export default function SignInScreen() {
  const [values, loading, error] = useCollectionData(firestore.collection('collection'), {idField: 'id'});

  const signInAsGuest = async () => {
    try {
      firebase.auth().signInAnonymously()
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
