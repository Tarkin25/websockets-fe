import React, { useState, Fragment, useContext } from "react";
import { UserContext } from '../contexts/UserContext';
import API from "../config/api";
import { withRouter } from "react-router-dom";
import withStorage from '../components/high-order/withStorage';
import withAlert from "../components/high-order/withAlert";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  InputAdornment,
  IconButton,
  TextField,
  Paper,
  Button,
  Grid
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyle = makeStyles(theme => ({
  appBar: {
    padding: theme.spacing(2, 0, 2, 0)
  },
  paper: {
    padding: theme.spacing(4),
    display: "inline-block",
    background: theme.palette.secondary.light
  },
  textField: {
    background: "white"
  },
  container: {
    marginTop: "10vh",
    marginBottom: "10vh"
  }
}));

const LoginPage = props => {
  const classes = useStyle();

  const { history, save, displayAlert } = props;

  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = e => {
    e.preventDefault();

    API.post("/login", { username, password })
      .then(res => {
        save("token", res.headers["authorization"]);
        setUser(res.data);
        history.push("/");
      })
      .catch(error => {
        displayAlert("Invalid username or password", "danger");
      });
  };

  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h3">WhatsUp</Typography>
        </Toolbar>
      </AppBar>

      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs />
        <Grid item container xs={9} md={6} lg={4} xl={3}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <center>
                    <Typography variant="h4">Login</Typography>
                  </center>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                    label="Username"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    label="Password"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword}>
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push("/register")}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs />
      </Grid>
    </Fragment>
  );
};

export default withRouter(withStorage(withAlert(LoginPage)));
