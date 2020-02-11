import React, { useState } from "react";
import styled from "styled-components";

const InputWindow = styled.div`
  display: ${props => (props.isOpen ? "flex" : "none")};
  flex: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const InputContainer = styled.form`
  position: relative;
  width: 75%;
  height: 50%;

  h1 {
    color: whitesmoke;
  }

  small {
    text-align: center;
    color: whitesmoke;
  }
`;

const FancyInput = styled.input`
  width: 100%;
  height: 20%;
  font-size: 2rem;
  background-color: transparent;
  border: 0;
  border-bottom: solid 5px white;
  outline: none;
  margin-bottom: 5px;
  color: whitesmoke;

  &::placeholder {
    color: whitesmoke;
    opacity: 0.6;
  }
`;

const MessageInput = ({ showInput, addNewMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addNewMessage(message);
    setMessage("");
  };

  return (
    <InputWindow isOpen={showInput}>
      <InputContainer onSubmit={handleSubmit}>
        <h1>Enter your message:</h1>
        <FancyInput
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <small>
          Press <i>"return"</i> to submit the message or press <i>"esc"</i> to
          close window.
        </small>
      </InputContainer>
    </InputWindow>
  );
};

export default MessageInput;
