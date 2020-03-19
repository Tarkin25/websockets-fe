import React, { useState, Fragment, useContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/bootstrap/Header";
import API from "../config/api";
import withStorage from "../components/high-order/withStorage";
import { UserContext } from "../contexts/UserContext";
import withAlert from "../components/high-order/withAlert";

const LoginPage = props => {
  const { history, save, displayAlert } = props;

  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

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
      <Header>
        <div className="text-center display-2">Login</div>
      </Header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary mr-2" type="submit">
              Login
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => history.push("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default withRouter(withStorage(withAlert(LoginPage)));
