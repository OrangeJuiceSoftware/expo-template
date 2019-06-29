import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../../FirebaseInit'
const firestore = firebase.firestore();

export default function Main() {

  const [values, loading, error] = useCollectionData(firestore.collection('collection'), {idField: 'id'});

  return (
    <Text>Open up App.js to start working on your app!</Text>
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
