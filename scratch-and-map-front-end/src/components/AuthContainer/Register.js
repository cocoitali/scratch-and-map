import React, { useState } from "react";

const Register = props => {
  const [state, setState] = useState(props)

    return (
      <div className="login-register-wrapper">
        <div className="form-wrapper">
          <form onSubmit={state.handleSubmit}>
            <div className="input-wrapper">
              <label className="login-label">Username</label>
              <input
                className="login-input"
                name="username"
                value={state.username}
                placeholder=""
                onChange={state.inputChange}
                type="text"
              />
            </div>

            <div className="input-wrapper">
              <label className="login-label">Email</label>
              <input
                className="login-input"
                name="email"
                value={state.email}
                placeholder=""
                onChange={state.inputChange}
                type="email"
              />
            </div>

            <div className="input-wrapper">
              <label className="login-label">Password</label>
              <input
                className="login-input"
                name="password"
                value={state.password}
                placeholder=""
                onChange={state.inputChange}
                type="password"
              />
            </div>
            <div>
              <button
                className="login-btn"
                type="submit"
                onClick={state.submit}
              >
                Start scratching now
              </button>
            </div>
            <div className="terms">
              This page is protected by reCAPTCHA, and subject to Google's{" "}
              <a href="#" className="terms-link">
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="#" className="terms-link">
                Terms of Service
              </a>
              . By signing up you agree to Scratch & Map's{" "}
              <a href="#" className="terms-link">
                Terms of Service
              </a>
              .
            </div>
            <div className="third-party">Or, use another account:</div>
          </form>
        </div>
      </div>
    );
  }


export default Register;
