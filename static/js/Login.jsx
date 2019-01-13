import React from "react";
import "../css/Login";

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="dhl-half" />
        <div className="form-half">
          <div className="form-side">
            <div className="welcome-msg">Welcome to DHL portal!</div>
            <div className="form-input">
              <div className="form-input2">
                <form action="./VNav" method="post">
                  <div className="center">
                    <label>
                      Email
                      <input type="text" id="email" name="email" />
                    </label>
                  </div>

                  <div className="center">
                    <label>
                      Password
                      <input type="password" id="password" name="password" />
                    </label>
                  </div>

                  <div className="center">
                    <button className="login-button" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div className="center center-footer">
                  <footer>
                    Do not have an account? Sign up <a href="#">here</a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
