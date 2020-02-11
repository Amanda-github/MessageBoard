import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  width: 100%;
  padding: 10px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const OnlineUser = styled.button`
  width: 200px;
  height: 75px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
`;

const OnlineUsers = ({ onlineUsers }) => {
  return (
    <UserContainer>
      {onlineUsers.map(user => {
        // need to use {user.username} because user is an object, so need to .something to reflect the value//
        return (
          <>
            <div>
              <OnlineUser>
                <i class="far fa-user"></i> <span> </span>
                {user.username}{" "}
              </OnlineUser>
            </div>
          </>
        );
      })}
    </UserContainer>
  );
};

export default OnlineUsers;
