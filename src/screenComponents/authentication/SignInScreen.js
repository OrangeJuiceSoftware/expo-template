import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Header, Content, Form, Item, Input, Button, Icon } from 'native-base';

import firebase from '../../../FirebaseInit';
const firebaseAuth = firebase.auth();

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    {
      value,
      onChangeText: text => {
        setValue(text);
      }
    },
    () => setValue(""),
    setValue
  ];
};

export default function SignInScreen() {
  const [email, bindEmail, resetEmail] = useInput();
  const [password, bindPassword, resetPassword] = useInput();

  const [emailError, setEmailError] = useState()

  const signInAsGuest = async () => {
    try {
      await firebaseAuth.signInAnonymously()
    } catch (e) {
      console.log(e);
    }
  }

  const signUpWithEmail = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      setEmailError(e)
    }
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input {...bindEmail} placeholder={'email'}/>
            {emailError && <Text>{emailError.code}</Text>}
          </Item>

          <Item last>
            <Input {...bindPassword} placeholder={'password'}/>
          </Item>
        </Form>

        <Button onPress={() => signUpWithEmail(email, password)}>
          <Text>Sign Up</Text>
        </Button>

        <Text onPress={signInAsGuest}>Continue as guest</Text>
      </Content>
    </Container>
  );
}
