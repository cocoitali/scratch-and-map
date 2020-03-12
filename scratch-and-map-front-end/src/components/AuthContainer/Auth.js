import React, { useState } from "react";
import FbLogin from "./FbLogin";
import axios from "axios";
import { Button, Modal } from "semantic-ui-react";


const Auth = props => {
  const [loginCreds, setLoginCreds] = useState({
    isLoginOpen: true,
    isRegisterOpen: false,
    username: "",
    password: "",
    email: ""
  });

  const clearState = () => {
    setLoginCreds({ username: "", password: "", email: "" });
  };

  const showLogin = e => {
    this.clearState();
    setLoginCreds({ isLoginOpen: true, isRegisterOpen: false });
  };

  const showRegister = e => {
    this.clearState();
    setLoginCreds({ isRegisterOpen: true, isLoginOpen: false });
  };

  const handleInputChange = e => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    const action = loginCreds.isLoginOpen ? "login" : "signup";
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/${action}`, {
        username: loginCreds.username,
        email: loginCreds.email,
        password: loginCreds.password
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/map"); //Not currently redirecting
      });
  };

  return (
    <div className="landing">
      <div className="Nav">
        <Modal
          size="mini"
          trigger={
            <Button className="navbutton" inverted>
              SIGN UP
            </Button>
          }
          closeIcon
        >
          <Modal.Content>
            <div className="box-wrapper">
              {loginCreds.isLoginOpen && (
                <FbLogin
                  onChange={e => handleInputChange(e)}
                  submit={e =>onSubmitHandler(e)}
                />
              )}
            </div>
          </Modal.Content>
        </Modal>

        <Modal
          size="mini"
          trigger={
            <Button className="navbutton" inverted>
              LOG IN
            </Button>
          }
          closeIcon
        >
          <Modal.Content image>
            <div className="box-wrapper">
              {loginCreds.isLoginOpen && (
                <FbLogin
                  onChange={e => handleInputChange(e)}
                  submit={e =>onSubmitHandler(e)}
                />
              )}
            </div>
          </Modal.Content>
        </Modal>

        {/* <div className="auth-wrapper">
        <div className="auth-controller">
          <div
            className={
              "controller" +
              (this.state.isRegisterOpen ? "selected-controller" : "")
            }
            onClick={this.showRegister}
          >
            Sign Up
          </div>
          <div
            className={
              "login-controller" +
              (this.state.isLoginOpen ? "selected-controller" : "")
            }
            onClick={this.showLogin}
          >
            Log In
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Auth;
