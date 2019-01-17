import React from "react";
import "../css/Signup";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.checkForm = this.checkForm.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  checkForm() {
    var obj = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    var firstName = obj.firstName;
    var lastName = obj.lastName;
    var email = obj.email;
    var password = obj.password;


    //validating all the fields
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("You have a blank field.");
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.")
    }

    // if (password.length < 8) {
    //   alert("Please enter a password with at least 8 characters")
    // }


    // var re = /^\w+$/;
    // if (!re.test(firstName) || re.test(lastName)) {
    //   alert(
    //     "Error: Username must contain only letters, numbers and underscores!"
    //   );
    // }
    return obj;
  }


  handleSignup(e) {
    var obj = this.checkForm();
    //checking for valid email & password
    console.log(obj);
    this.postData("/register_api", obj)
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
  async postData(url, bodyObj) {
    console.log(JSON.stringify(bodyObj));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });
    const body = await response.json();
    console.log(body);
    return body;
  }

  render() {
    return (
      <div className="signup">
        <div className="dhl-half" />
        <div className="form-half">
          <div className="form-side_s">
            <div className="welcome-msg">Join the DHL Family now!</div>
            <div className="form-input_s">
                <form className="signup-form_s">
                    <div className="center">
                        <div className="fullname">
                            <div className="firstName">
                                <label className="signup-label">
                                First Name
                                <br/>
                                <input className="signup-input" type="text" id="firstName" name="firstName"/>
                                </label>
                            </div>
                            <div className="lastName">
                                <label className="signup-label">
                                Last Name
                                <br/>
                                <input className="signup-input" type="text" id="lastName" name="lastName"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="center">
                        <label className="signup-label">
                        Email
                        <br/>
                        <input className="signup-input" type="text" id="email" name="email"/>
                        </label>
                    </div>
                    <div className="center">
                        <label className="signup-label">
                        Password
                        <br/>
                        <input className="signup-input" type="password" id="password" name="password"/>
                        </label>
                    </div>
                    <br />
                    <div className="center">
                        <div className="signup-button" onClick={this.handleSignup}>Signup</div>
                    </div>
                </form>
                <div className="center center-footer">
                    <footer className="signup-footer">
                        Already an account? Login <a href="/login">here</a>
                    </footer>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}