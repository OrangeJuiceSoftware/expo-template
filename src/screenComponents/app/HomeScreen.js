import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Button } from 'native-base';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../../../FirebaseInit'
const firestore = firebase.firestore();

export default function Main(props) {
  const {navigation} = props
  const [values, loading, error] = useCollectionData(firestore.collection('collection'), {idField: 'id'});
  
  return (
    <>
      <Button onPress={() => props.navigation.navigate('MyModal')}>
        <Text>Modal</Text>
      </Button>


      <Button onPress={() => navigation.navigate("Second")}>
        <Text>Second Screen</Text>
      </Button>
        
      <Button onPress={() => firebase.auth().signOut()}>
        <Text>Sign Out</Text>
      </Button>
        
    </>
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
