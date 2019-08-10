import React, {useState} from 'react';

import { Content, Form, Item, Input, Button, Text, H1 } from 'native-base';

import firebase from '../../../FirebaseInit';
const firebaseAuth = firebase.auth();

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [
    // value
    value,
    // bind
    {
      value,
      onChangeText: text => {
        setValue(text);
      }
    },
    // reset
    () => setValue(""),
    // set
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
    <Content contentContainerStyle={{alignItems: 'center'}}>
      <H1>Orange Juice</H1>
        
      <Form style={{width: '60%'}}>
        <Item rounded>
          <Input {...bindEmail} placeholder={'email'}/>
          {emailError && <Text>{emailError.code}</Text>}
        </Item>

        <Item rounded>
          <Input {...bindPassword} placeholder={'password'}/>
        </Item>
      </Form>

      <Button
        block 
        onPress={() => signUpWithEmail(email, password)}>
        <Text>Sign Up</Text>
      </Button>

      <Text onPress={signInAsGuest}>Continue as guest</Text>

    </Content>
  );
}
