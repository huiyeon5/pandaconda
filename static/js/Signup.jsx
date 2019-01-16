import React from "react";
import "../css/Signup";

export default class Signup extends React.Component {
  checkForm() {
    var obj = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    var email = obj.email;
    var password = obj.password;
    email.includes("@");
    password.includes();

    
    //validating all the fields
    if(firstName == "" || lastName == "" || email=="" || password == ""){
      alert("You have a blank field.")
    }
    re = /^\w+$/;
    if(!re.test(form.username.value)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
    
  }
  handleSignup(e, obj) {
    checkForm();
    //checking for valid email & password
    this.postData("/register_api", obj)
      .then(res => {
        if (res["status"] === 400) {
          alert("You have entered an invalid username or password");
        } else {
          console.log(res);
          window.location = "/home/";
        }
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

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
                          <label className="signup-label">
                            First Name
                            <input
                              className="signup-input"
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </label>
                        </div>
                        <div className="lastName">
                          <label className="signup-label">
                            Last Name
                            <input
                              className="signup-input"
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="center">
                      <label className="signup-label">
                        Email
                        <input
                          className="signup-input"
                          type="text"
                          id="email"
                          name="email"
                        />
                      </label>
                    </div>
                    <br />
                    <div className="center">
                      <label className="signup-label">
                        Password
                        <input type="password" id="password" name="password" />
                      </label>
                    </div>
                    <br />
                    <div className="center">
                      <div
                        className="signup-button"
                        onclick={this.handleSignup}
                      >
                        Signup
                      </div>
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
