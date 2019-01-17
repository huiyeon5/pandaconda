import React from "react";
import "../css/Login";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.postData = this.postData.bind(this);
  }

  //GET
  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  //POST
  async postData(url, bodyObj) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });
    const body = await response.json();
    return body;
  }

  handleLogin(e) {
    var obj = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    this.postData("/login_api", obj)
      .then(res => {
        if (res["status"] === 400) {
          alert("You have entered an invalid username or password");
        } else {
          console.log(res);
          window.location = "/";
        }
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="login">
        <div className="dhl-half" />
        <div className="form-half">
          <div className="form-side">
            <div className="welcome-msg">Welcome to DHL portal!</div>
            <div className="form-input">
              <div className="form-input2">
                <form className="login-form">
                  
                  <div className="center">
                    <label>
                      Email
                      <br/>
                      <input className = "login-username-input" type="email" id="email" name="email" />
                    </label>
                  </div>
                  <br/>
                  <div className="center">
                    <label>
                      Password
                      <br/>
                      <input className = "login-password-input" type="password" id="password" name="password" />
                    </label>
                  </div>

                  <div className="center">
                    <div className="login-button" onClick={this.handleLogin}>
                      Login
                    </div>
                  </div>
                </form>
                <div className="center center-footer">
                  <footer className="login-footer">
                    Do not have an account? Sign up <a href="/signup">here</a>
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
