import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../hooks/UseAuth';
import ChatList from './ChatList';
import ChatComponent from './ChatComponent';
import Navbar from '../../components/navbar/Navbar';
import './ChatScreen.css';
import { useParams } from 'react-router-dom';

function ChatScreen() {
  const { user } = useContext(AuthContext);
  const { chatId, sellerId } = useParams();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedOtherUser, setSelectedOtherUser] = useState(null);
  const toastTR = useRef(null);

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  useEffect(() => { 
    setSelectedChatId(chatId);
    setSelectedOtherUser(sellerId);
  }, [chatId, sellerId])

  const handleSelectChat = (chatId, otherUser) => {
    setSelectedChatId(chatId);
    setSelectedOtherUser(otherUser);
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
      <div className="page-containers chat-page">
        <div className="chat-layout">
          
          {/* Sidebar */}
          <div className="chat-sidebar">
            <div className="chat-header-sidebar">
              <h2>Messages</h2>
            </div>
            <ChatList 
              onSelectChat={handleSelectChat}
            />
          </div>

          {/* Main Chat Area */}
          <div className="chat-main">
            {selectedChatId && selectedOtherUser ? (
              <ChatComponent 
                chatId={selectedChatId} 
                otherUser={selectedOtherUser} 
              />
            ) : ( 
              <div className="no-chat-selected">
                <h3>Select a conversation to start chatting</h3>
                <p>Your messages will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatScreen;