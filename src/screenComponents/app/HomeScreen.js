import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Button } from 'native-base';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import firebase from '../../../FirebaseInit'
const firestore = firebase.firestore();

export default function Main(props) {
  const {navigation} = props

  const userID = firebase.auth().currentUser.uid;
  const [userValue, userValueLoading, userValueError] = useDocumentData(firestore.collection('user-values').doc(userID), {idField: 'id'});

  const incrementValue = () => {
    firestore.collection('user-values')
      .doc(userID)
      .set({
        value: userValue && userValue.value + 1 || 1
      });
  };

  const decrementValue = () => {
    firestore.collection('user-values')
      .doc(userID)
      .set({
        value: userValue && userValue.value - 1 || 0
      });
  };

  return (
    <>
      <Button onPress={() => props.navigation.navigate('MyModal')}>
        <Text>Open Modal</Text>
      </Button>

      <Button onPress={() => navigation.navigate("Second")}>
        <Text>Open Second Screen</Text>
      </Button>

      <Text>Your value: {userValue && userValue.value}</Text>
      <Button onPress={() => incrementValue()}>
        <Text>Increment</Text>
      </Button>
      <Button onPress={() => decrementValue()}>
        <Text>Decrement</Text>
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
