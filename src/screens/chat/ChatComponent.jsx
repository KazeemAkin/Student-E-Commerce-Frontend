import { useState, useEffect, useRef, useContext } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  limit
} from 'firebase/firestore';
import { AuthContext } from '../../hooks/UseAuth';
import firebaseDb from '../../config/firebase';
// import { db } from '../../config/firebase';

const ChatComponent = ({ chatId, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  // Real-time Messages Listener
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(firebaseDb, 'chats', chatId, 'messages');
    const q = query(
      messagesRef,
      orderBy('createdAt', 'asc'),
      limit(200)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    const messageData = {
      text: newMessage.trim(),
      senderId: user._id,
      createdAt: serverTimestamp(),
    };

    try {
      const messagesRef = collection(firebaseDb, 'chats', chatId, 'messages');
      await addDoc(messagesRef, messageData);

      // Update last message in chat document
      await updateDoc(doc(firebaseDb, 'chats', chatId), {
        lastMessage: newMessage.trim(),
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: user._id,
      });

      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-screen">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">
            {otherUser?.photoURL ? (
              <img src={otherUser.photoURL} alt="" />
            ) : (
              otherUser?.name?.charAt(0) || '?'
            )}
          </div>
          <div>
            <h3>{otherUser?.name || 'User'}</h3>
            <p className="status">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="no-messages">Say hello to start the conversation!</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.senderId === user._id ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="timestamp">
                  {msg.createdAt?.toDate?.()
                    ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          autoFocus
        />
        <button type="submit" disabled={!newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;