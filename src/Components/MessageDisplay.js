import React, { useRef } from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  width: 100%;
  margin-top: 0px;
  padding: 3em;
  padding-bottom: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    color: black;
  }

  small {
    text-align: center;
    color: black;
  }
`;

const MessageBox = styled.div`
  width: 600px;
  min-height: 75px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 15px;
  padding: 1em;
  box-sizing: border-box;
  color: black;
  align-self: ${props => (props.right ? "flex-end" : "flex-start")};
`;

const scrolling = ref => window.scrollTo(0, ref.current.offsetTop);
const MessageDisplay = ({ messages, username }) => {
  let scroll = useRef(null);
  const executeScroll = () => scrolling(scroll);

  return (
    <MessageContainer>
      <h1>
        NEXT Chatroom <span> </span>
        <i class="far fa-envelope"></i>
      </h1>
      <small>Hit enter to type a new message ...</small>
      {messages.map((message, index) => {
        return (
          <MessageBox
            key={index}
            {...(username === message.username ? { right: true } : "")}
          >
            <h2>
              {" "}
              <i class="far fa-user-circle"></i> <span> </span>
              {message.username}
            </h2>
            <p>
              {" "}
              <i class="far fa-comment"></i> <span> </span>
              {message.message}
            </p>
            <small>
              Sent at: <i>{message.timestamp}</i>
            </small>
          </MessageBox>
        );
      })}
      <button
        ref={scroll}
        onClick={executeScroll}
        style={{
          alignSelf: "flex-end",
          borderRadius: "10px",
          width: "100px",
          height: "50px",
          padding: "10px"
        }}
      >
        <b>
          <i class="far fa-arrow-alt-circle-down"></i> Scroll
        </b>
      </button>
    </MessageContainer>
  );
};

export default MessageDisplay;
