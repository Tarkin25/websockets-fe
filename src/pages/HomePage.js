import React, { Fragment, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ChatDisplay from "../components/bootstrap/chat/ChatDisplay";
import ChatContextProvider from "../contexts/ChatContext";
import SelectedChat from "../components/bootstrap/chat/SelectedChat";
import { AppBar, makeStyles, Toolbar, Typography, Button, Menu, MenuItem, Grid } from "@material-ui/core";

const headerHeight = "96px";

const useStyle = makeStyles(theme => ({
  headerRoot: {
    height: headerHeight,
    padding: theme.spacing(2, 0, 2, 0)
  },
  headerTitle: {
    flexGrow: 1
  },
  headerButton: {
    color: theme.palette.primary.contrastText
  },
  content: {
    height: `calc(100vh - ${headerHeight})`
  },
  borderRight: {
    borderRight: `1px solid ${theme.palette.primary.light}`
  }
}));

const HomePage = props => {
  const classes = useStyle();

  const { user, logout } = useContext(UserContext);

  const { history } = props;

  const ProfileDropdown = () => {
    const [anchor, setAnchor] = useState(null);

    const handleClick = e => setAnchor(e.currentTarget);

    const handleClose = e => setAnchor(null);

    const options = [
      <div>
        Profile
      </div>,
      <div onClick={logout}>
        Logout
      </div>
    ];

    return (
      <div>
        <Button onClick={handleClick} className={classes.headerButton} >
          {user.username}
        </Button>

        <Menu
          anchorEl={anchor}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          keepMounted
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem onClick={handleClose} key={"menu-item-" + index}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }

  if(user) {
    return (
      <Fragment>
        
        <AppBar position="static" className={classes.headerRoot} >
          <Toolbar>
            <Typography variant="h3" className={classes.headerTitle} >WhatsUp</Typography>
            <ProfileDropdown />
          </Toolbar>
        </AppBar>
  
        <ChatContextProvider>
            {/* <div className="row">
              <div className="col-sm-4 border-right" style={{paddingRight: 0, paddingLeft: 0}}>
                <ChatDisplay />
              </div>
              <div className="col-sm-8" style={{paddingRight: 0, paddingLeft: 0, height: `calc(100vh - ${headerHeight})`}}>
                <SelectedChat/>
              </div>
            </div> */}
            <Grid container direction="row">
              <Grid item xs={4} className={classes.borderRight}>
                <ChatDisplay  className={classes.content} />
              </Grid>
              <Grid item xs={8} className={classes.content}>
                <SelectedChat />
              </Grid>
            </Grid>
        </ChatContextProvider>
      </Fragment>
    );
  } else {
    history.push("/login"); 
    return null;
  }

};

export default HomePage;
