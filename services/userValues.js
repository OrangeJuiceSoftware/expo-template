import Firebase from 'firebase';
import firebase from '../FirebaseInit';

const firestore = firebase.firestore();
const userValuesCollection = firestore.collection('user-values');

export default userValuesCollection;

export const incrementUserValue = async (userID) => {
  return userValuesCollection
    .doc(userID)
    .update({
      value: Firebase.firestore.FieldValue.increment(1)
    });
};

export const decrementUserValue = async (userID) => {
  return userValuesCollection
    .doc(userID)
    .update({
      value: Firebase.firestore.FieldValue.increment(-1)
    });
};
