import React, { Fragment, useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import ChatDisplay from "../components/chat/ChatDisplay";
import ChatContextProvider from "../contexts/ChatContext";
import SelectedChat from "../components/chat/SelectedChat";

const HomePage = props => {
  const { user } = useContext(UserContext);

  const { history } = props;

  if (user === null) {
    history.push("/login");
  }

  return (
    <Fragment>
      <Header>
        <span className="display-2">Home</span>
        <span className="float-right display-body">{user.username}</span>
      </Header>

      <ChatContextProvider>
          <div className="row" style={{width: "100%", margin: 0, padding: 0}}>
            <div className="col-sm-4" style={{paddingRight: 0, paddingLeft: 0}}>
              <ChatDisplay />
            </div>
            <div className="col-sm-8" style={{paddingRight: 0, paddingLeft: 0}}>
              <SelectedChat/>
            </div>
          </div>
      </ChatContextProvider>
    </Fragment>
  );
};

export default HomePage;
