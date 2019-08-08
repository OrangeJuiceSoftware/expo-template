import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Toast } from 'native-base';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import firebase from '../../../FirebaseInit';
const firestore = firebase.firestore();

import {
  incrementUserValue,
  decrementUserValue
} from '../../../services/userValues';

export default function Main(props) {
  const {navigation} = props;

  const userID = firebase.auth().currentUser.uid;
  const [userDocument, userDocumentLoading, userDocumentError] = useDocumentData(firestore.collection('user-values').doc(userID), {idField: 'id'});

  const userValue = userDocument && userDocument.value || 0;

  return (
    <>
      <Button onPress={() => navigation.navigate('MyModal')}>
        <Text>Open Modal</Text>
      </Button>

      <Button onPress={() => navigation.navigate("Second")}>
        <Text>Open Second Screen</Text>
      </Button>

      <Button
        full
        onPress={() =>
          Toast.show({
            text: "Wrong password!",
            buttonText: "Okay"
          })}
          >
        <Text>Toast</Text>
      </Button>

      <Text>Your value: {userValue}</Text>
      <Button onPress={() => incrementUserValue(userID)}>
        <Text>Increment</Text>
      </Button>
      <Button onPress={() => decrementUserValue(userID)}>
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
