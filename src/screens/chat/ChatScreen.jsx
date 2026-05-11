import { useContext, useState } from 'react';
import ChatComponent from './ChatComponent';
import { AuthContext } from '../../hooks/UseAuth';
import ChatList from './ChatList';
import Navbar from '../../components/navbar/Navbar';

import './ChatScreen.css';

function ChatScreen () {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedOtherUser, setSelectedOtherUser] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSelectChat = (chatId, otherUser) => {
    setSelectedChatId(chatId);
    setSelectedOtherUser(otherUser);
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
      <div className="page-containers chat-page">
        <div className="chat-page">
          <div className="chat-layout">
            
            {/* Left Sidebar - Chat List */}
            <div className="chat-sidebar">
              <div className="chat-header-sidebar">
                <h2>Messages</h2>
              </div>
              <ChatList
                currentUser={user} 
                onSelectChat={handleSelectChat} 
              />
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
              {/* {selectedChatId && selectedOtherUser ? ( */}
                <ChatComponent
                  chatId={selectedChatId} 
                  otherUser={selectedOtherUser} 
                />
              {/* ) : (
                <div className="no-chat-selected">
                  <h3>Select a conversation to start chatting</h3>
                  <p>Your messages will appear here</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      </section>
  );
};

export default ChatScreen;