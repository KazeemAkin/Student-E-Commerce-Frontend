import { useState, useEffect, useRef, useContext } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../hooks/UseAuth';
import { firebaseDb } from '../../config/firebase';
import { MdSend } from 'react-icons/md';
import colors from '../../config/colors';

const ChatComponent = ({ chatId, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  // Real-time Messages
  useEffect(() => {
    console.log({ otherUser });
    if (!chatId) return;

    const messagesRef = collection(firebaseDb, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !user?.id) return;

    try {
      const messagesRef = collection(firebaseDb, 'chats', chatId, 'messages');

      await addDoc(messagesRef, {
        text: newMessage.trim(),
        senderId: user.id,
        createdAt: serverTimestamp(),
      });
      await setDoc(
        doc(firebaseDb, 'chats', chatId),
        {
          participantIds: [user.id, otherUser?.id],
          participants: {
            [user.id]: {
              id: user.id,
              first_name: user.first_name || '',
              first_name: user.first_name || '',
              username: user.username || '',
              avatar: user.avatar || user.photoURL || '',
            },
            [otherUser?.id]: {
              id: otherUser?.id,
              first_name: otherUser?.first_name || '',
              last_name: otherUser?.last_name || '',
              username: otherUser?.username || '',
              avatar: otherUser?.avatar || '',
            },
          },
          lastMessage: newMessage.trim(),
          lastMessageTime: serverTimestamp(),
          lastMessageSenderId: user.id,
        },
        { merge: true }
      );
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-screen">
      {/* Header */}
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">
            {otherUser?.avatar ? (
              <img src={otherUser.avatar } alt="" />
            ) : (
              (otherUser?.username || '?')[0]
            )}
          </div>
          <div className='chat-name'>
            <span className='name-label'>{otherUser?.username || 'User'}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="no-messages">Say hello to start the conversation 👋</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.senderId === user?.id ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <div className={`${msg.senderId === user?.id ? 'sent' : 'received'}`}>
                  <span className="timestamp">
                    {msg.createdAt?.toDate?.()
                      ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                  <span>{msg.text}</span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!newMessage.trim()}>
          <MdSend size={30} color={ !newMessage.trim() ? colors.gray : colors.primary } />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;