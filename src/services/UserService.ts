import { db } from '../config/firebase';
import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { User } from '../types/user';

export const getUser = async (id: string): Promise<User> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('User not found.');

  return { id: docSnap.id, ...docSnap.data() } as User;
};

export const addUser = async (userData: any): Promise<string> => {
  if (!userData.email || !userData.uid) {
    throw new Error('Invalid user data.');
  }

  const userRef = doc(db, 'users', userData.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    throw new Error('User already exists. Please log in.');
  }

  const { password, ...safeUser } = userData;

  const newUser = {
    ...safeUser,
    uid: userData.uid,
    createdAt: new Date(),
    favorites: [],
    ...(safeUser.role === 'seller' && { propertiesListed: [] }),
  };

  await setDoc(userRef, newUser);

  return userData.uid; 
}