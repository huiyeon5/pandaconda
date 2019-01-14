import React from "react";
import "../css/Signup";

export default class Signup extends React.Component {
  render() {
    return (
      <div className="signup">
        <div className="dhl-half" />
        <div className="form-half">
          <div className="form-side">
            <div className="welcome-msg">Join the DHL Family now!</div>
            <div className="form-input">
              <div className="form-input2">
                <div className="center-container">
                  <form className="signup-form">
                    <div className="center">
                      <div className="fullname">
                        <div className="firstName">
                          <label>
                            First Name
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </label>
                        </div>
                        <div className="lastName">
                          <label>
                            Last Name
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </label>
                        </div>
                      </div>
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
                        Signup
                      </button>
                    </div>
                  </form>
                  <div className="center">
                    <footer className="signup-footer">
                      Already an account? Login <a href="#">here</a>
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
