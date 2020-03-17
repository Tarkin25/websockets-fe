import React, { Fragment, useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import ChatDisplay from "../components/chat/ChatDisplay";
import ChatContextProvider from "../contexts/ChatContext";
import SelectedChat from "../components/chat/SelectedChat";

const headerHeight = "137px";
const styles = {
  header: {
    height: headerHeight
  },
  body: {
    height: `calc(100vh - ${headerHeight})`,
    width: "100%",
    margin: 0,
    padding: 0
  }
}

const HomePage = props => {
  const { user } = useContext(UserContext);

  const { history } = props;

  if(user) {
    return (
      <Fragment>
        <Header style={styles.header}>
          <span className="display-2">WhatsUp</span>
          <span className="float-right display-body">{user.username}</span>
        </Header>
  
        <ChatContextProvider>
            <div className="row" style={styles.body}>
              <div className="col-sm-4 border-right" style={{paddingRight: 0, paddingLeft: 0}}>
                <ChatDisplay />
              </div>
              <div className="col-sm-8" style={{paddingRight: 0, paddingLeft: 0, height: `calc(100vh - ${headerHeight})`}}>
                <SelectedChat/>
              </div>
            </div>
        </ChatContextProvider>
      </Fragment>
    );
  } else {
    history.push("/login"); 
    return null;
  }

};

export default HomePage;
