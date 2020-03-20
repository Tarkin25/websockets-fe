import React, { useState, Fragment } from "react";
import API from "../config/api";
import { withRouter } from "react-router-dom";
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
    background: theme.palette.secondary.main
  },
  textField: {
    background: "white"
  },
  container: {
    marginTop: "10vh",
    marginBottom: "10vh"
  }
}));

const RegisterPage = props => {
  const classes = useStyle();

  const { history, displayAlert } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = e => {
    e.preventDefault();

    API.post("/users", { username, password })
      .then(res => {
        if (res.status === 201) {
          history.push("/login");
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          displayAlert(`Username '${username}' is already in use`, "danger");
        }
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
                    <Typography variant="h4">Register</Typography>
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
                    Register
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push("/login")}
                  >
                    Back to Login
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

export default withRouter(withAlert(RegisterPage));
