import React from "react";
import "../css/Login";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.postData = this.postData.bind(this);
  }
  componentDidMount(){
    document.getElementById("password").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementsByClassName("login-button-pc")[0].click();
      }
    });
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
      <div className="login-pc">
        <div className="dhl-half-pc" />
        <div className="form-half-pc">
          <div className="form-side-pc">
            <div className="welcome-msg-pc">Welcome to DHL portal!</div>
            <div className="form-input-pc">
              <div className="form-input2-pc">
                <form className="login-form-pc">
                  
                  <div className="center-pc">
                    <label className="label-pc">
                      Email
                      <br/>
                      <input className = "login-username-input-pc" type="email" id="email" name="email" />
                    </label>
                  </div>
                  <br/>
                  <div className="center-pc">
                    <label className="label-pc">
                      Password
                      <br/>
                      <input className = "login-password-input-pc" type="password" id="password" name="password" />
                    </label>
                  </div>

                  <div className="center-pc">
                    <div className="login-button-pc" onClick={this.handleLogin}>
                      Login
                    </div>
                  </div>

                  


                </form>
                <div className="center-pc center-footer-pc">
                  <footer className="login-footer-pc">
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
