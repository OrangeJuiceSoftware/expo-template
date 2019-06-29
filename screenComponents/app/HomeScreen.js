import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../../FirebaseInit'
const firestore = firebase.firestore();

export default function Main(props) {

  const [values, loading, error] = useCollectionData(firestore.collection('collection'), {idField: 'id'});



  return (
    <Button
    onPress={() => props.navigation.navigate('MyModal')}
    title="modal"
    color="#000"
  />
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
