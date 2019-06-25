import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBF8BBKHxkeaeZmRPi8loPJaeWG-GPUQGM",
  authDomain: "lists-1524d.firebaseapp.com",
  databaseURL: "https://lists-1524d.firebaseio.com",
  projectId: "lists-1524d",
  storageBucket: "lists-1524d.appspot.com",
  messagingSenderId: "592775772595",
  appId: "1:592775772595:web:8174d4e77f79cd2c"
});

const firestore = firebase.firestore();

export default async function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
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
