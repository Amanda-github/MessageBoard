import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Socket from "./utils/socket";
import MessageInput from "./Components/MessageInput";
import OnlineUsers from "./Components/OnlineUsers";
import MessageDisplay from "./Components/MessageDisplay";

const AppContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: powderblue;
`;

function App() {
  useEffect(() => {
    document.title = "Message Board";
  });

  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [messages, setMessages] = useState([
    {
      username: "Edwind",
      message: "What did the ocean say to another ocean?",
      timestamp: 1544532325758
    },
    { username: "Liren", message: "sea you later?", timestamp: 1544532341078 },
    {
      username: "Edwind",
      message: "Nothing. It just waved",
      timestamp: 1544532347412
    },
    {
      username: "Josh",
      message: "I'm leaving this chatroom",
      timestamp: 1544532402998
    }
  ]);

  useEffect(() => {
    //generate new user in the socket
    Socket.emit("NEW_USER");

    Socket.on("GET_CURRENT_USER", user => {
      console.log(user.username);
      setUsername(user.username);
    });

    Socket.on("UPDATE_USER_LIST", users => {
      // console.log(users);
      setOnlineUsers(users);
    });
  }, []);

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setShowInput(true);
    } else if (e.keyCode === 27) {
      setShowInput(false);
    }
  };

  const addNewMessage = message => {
    const timeNow = Date.now();
    Socket.emit("BROADCAST_MESSAGE", {
      username: username,
      message: message,
      timestamp: timeNow
    });
    setShowInput(false);
  };
  console.log(messages);

  useEffect(() => {
    document.addEventListener("keydown", e => handleKeyDown(e));
    Socket.on("RECEIVE_BROADCAST", message => {
      setMessages(oldMessages => [...oldMessages, message]);
    });
  }, []);

  return (
    <AppContainer className="AppContainer" style={{ marginTop: "0px" }}>
      <MessageDisplay messages={messages} username={username} />
      <h3 style={{ color: "black", marginLeft: "50px" }}>
        Currently online <span> </span>
        <i class="fas fa-users"></i>
      </h3>
      <OnlineUsers
        onlineUsers={onlineUsers}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <MessageInput showInput={showInput} addNewMessage={addNewMessage} />
    </AppContainer>
  );
}

export default App;
