import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase.js';

export const createOrGetChat = async (currentUser, otherUser) => {
  if (!currentUser?.id || !otherUser?.id) {
    throw new Error("Both users are required");
  }

  const chatId = [currentUser.id, otherUser.id].sort().join('_');

  await setDoc(
    doc(firebaseDb, 'chats', chatId),
    {
      participants: [currentUser.id, otherUser.id],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),

      lastMessage: "",
      lastMessageTime: serverTimestamp(),
      lastMessageSenderId: null,

      // optional denormalized UI data
      users: {
        [currentUser.id]: {
          name: currentUser.name || '',
          avatar: currentUser.avatar || ''
        },
        [otherUser.id]: {
          name: otherUser.first_name || otherUser.email || 'User',
          avatar: otherUser.avatar || ''
        }
      }
    },
    { merge: true }
  );

  return chatId;
};