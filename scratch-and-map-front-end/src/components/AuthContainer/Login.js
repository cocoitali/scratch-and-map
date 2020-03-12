import React, { useState } from "react";
import FbLogin from "./FbLogin";

const Login = props => {
  const [credentials, setCredentials] = useState(props);

  // const login = e => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .post("/login", credentials)
  //     .then(res => {
  //       localStorage.setItem("token", res.data.token);
  //       this.props.history.push("/");
  //     });
  // };

  const handleInputChange = e => {
    setCredentials: ({
        ...credentials,
        [e.target.name]: e.target.value,
      })
  };

  return (
    <div className="login-register-wrapper">
      <div className="form-wrapper">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="input-wrapper">
            <label className="login-label">Username or email</label>
            <input
              className="login-input"
              name="username" //how to add a second name for email?
              value={credentials.username}
              placeholder=""
              onChange={credentials.inputChange}
              type="text"
            />
          </div>

          <div className="input-wrapper">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              name="password"
              value={credentials.password}
              placeholder=""
              onChange={e => handleInputChange(e)}
              type="password"
            />
          </div>
          <div className="input-wrapper">
            <button
              className="login-btn"
              type="submit"
              onClick={credentials.submit}
            >
              Log in
            </button>
          </div>
          <a href="/forgotpassword" className="forgot-pwd">
            I forgot my password
          </a>
          <FbLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
