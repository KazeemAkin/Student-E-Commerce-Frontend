/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { AuthContext } from '../../hooks/UseAuth';
import { firebaseDb } from '../../config/firebase';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.id) return;

    const chatsRef = collection(firebaseDb, 'chats');
    const q = query(
      chatsRef,
      where('participantIds', 'array-contains', user.id),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const userChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(userChats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user?.id]);

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
            const otherUserId = chat.participantIds.find(
              (id) => id !== user.id
              );
              const other_user_data = chat?.participants[otherUserId] || {};
          return (
            <div
              key={chat.id}
              className="chat-item"
              onClick={() =>
                onSelectChat(chat.id, {
                  uid: otherUserId,
                  username: other_user_data.username || '',
                  avatar: other_user_data.avatar || null,
                })
              }
            >
              <div className="chat-item-avatar">
                {other_user_data.avatar ? (
                  <img src={other_user_data.avatar} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {(other_user_data.username || 'N/A' || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="chat-item-info">
                <div className="chat-item-header">
                  <span className='chat-name'>{other_user_data.username || 'N/A'}</span>
                  <span className="chat-time">
                    {formatTime(chat.lastMessageTime)}
                  </span>
                </div>

                <div className="last-message">
                  {chat.lastMessageSenderId === user._id && 'You: '}
                  {chat.lastMessage
                    ? chat.lastMessage.length > 60
                      ? chat.lastMessage.substring(0, 57) + '...'
                      : chat.lastMessage
                    : '...'}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;