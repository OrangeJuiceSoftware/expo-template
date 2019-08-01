import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

export default function WelcomeModal() {
  return (
    <SafeAreaView>
      <Text>Welcome. swipe down to dismiss</Text>
    </SafeAreaView>
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
