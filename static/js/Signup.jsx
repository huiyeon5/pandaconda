import React from "react";
import "../css/Signup";

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="dhl-half" />
        <div className="form-half">
          <div className="form-side">
            <div className="welcome-msg">Join the DHL Family now!</div>
            <div className="form-input">
              <div className="form-input2">
                <div className="center-container">
                  <form>
                    <div className="center">
                      <label>
                        Name
                        <input type="text" id="email" name="email" />
                      </label>
                    </div>

                    <div className="center">
                      <label>
                        Email
                        <input type="text" id="email" name="email" />
                      </label>
                    </div>
                    <br />
                    <div className="center">
                      <label>
                        Password
                        <input type="password" id="password" name="password" />
                      </label>
                    </div>
                    <br />
                    <div className="center">
                      <button className="signup-button" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="center">
                    <Footer text="Sing" link="login" />
                    <Footer text="Sing" link="Sign Up" />
                    <footer>
                      {this.props.text}
                      <a href="#">here</a>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
