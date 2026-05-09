import { useState, useEffect, useContext } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import firebaseDb from '../../config/firebase';
// import './chat.css'; // Import your CSS
import { AuthContext } from '../../hooks/UseAuth';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?._id) return;

    const chatsRef = collection(firebaseDb, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', user._id),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(userChats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?._id]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return <div className="chat-list-loading">Loading chats...</div>;
  }

  return (
    <div className="chat-list">
      {chats.length === 0 ? (
        <div className="no-chats">
          <p>No conversations yet</p>
          <small>Start a new chat from users list</small>
        </div>
      ) : (
        chats.map((chat) => {
          const otherUserId = chat.participants.find(
            (id) => id !== user._id
          );

          return (
            <div
              key={chat.id}
              className="chat-item"
              onClick={() =>
                onSelectChat(chat.id, {
                  uid: otherUserId,
                  name: chat.otherUserName || otherUserId?.slice(0, 8),
                  photoURL: chat.otherUserPhoto || null,
                })
              }
            >
              <div className="chat-item-avatar">
                {chat.otherUserPhoto ? (
                  <img src={chat.otherUserPhoto} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {(chat.otherUserName || otherUserId || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="chat-item-info">
                <div className="chat-item-header">
                  <h4>{chat.otherUserName || otherUserId}</h4>
                  <span className="chat-time">
                    {formatTime(chat.lastMessageTime)}
                  </span>
                </div>

                <p className="last-message">
                  {chat.lastMessageSenderId === user._id && 'You: '}
                  {chat.lastMessage
                    ? chat.lastMessage.length > 60
                      ? chat.lastMessage.substring(0, 57) + '...'
                      : chat.lastMessage
                    : 'Start a conversation'}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;