import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Main(props) {
  return (
    <>
      <Text>Second Screen</Text>
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
