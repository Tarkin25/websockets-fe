import React, { useState, Fragment } from "react";
import Header from "../components/bootstrap/Header";
import API from "../config/api";
import { withRouter } from "react-router-dom";
import withAlert from "../components/high-order/withAlert";

const RegisterPage = (props) => {
  const {history, displayAlert} = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    API.post("/users", {username, password})
    .then(res => {
        if(res.status === 201) {
            history.push("/login");
        }
    })
    .catch(err => {
      if(err.response.status === 409) {
        displayAlert(`Username '${username}' is already in use`, "danger");
      }
    })
  };

  return (
    <Fragment>
      <Header>
          <div className="text-center display-2">Register</div>
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
              Register
            </button>
            <button className="btn btn-secondary" onClick={() => history.goBack()}>Back to Login</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default withRouter(withAlert(RegisterPage));
