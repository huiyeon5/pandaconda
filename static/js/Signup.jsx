import React from "react";
import "../css/Signup";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.checkForm = this.checkForm.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount(){
    document.getElementById("password").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementsByClassName("signup-button-pc")[0].click();
      }
    });
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
      <div className="signup-pc">
        <div className="dhl-half-pc" />
        <div className="form-half-pc">
          <div className="form-side_s-pc">
            <div className="welcome-msg-pc">Join the DHL Family now!</div>
            <div className="form-input_s-pc">
                <form className="signup-form_s-pc">
                    <div className="center-pc">
                        <div className="fullname-pc">
                            <div className="firstName-pc">
                                <label className="signup-label-pc">
                                First Name
                                <br/>
                                <input className="signup-input-pc" type="text" id="firstName" name="firstName"/>
                                </label>
                            </div>
                            <div className="lastName-pc">
                                <label className="signup-label-pc">
                                Last Name
                                <br/>
                                <input className="signup-input-pc" type="text" id="lastName" name="lastName"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="center-pc">
                        <label className="signup-label-pc">
                        Email
                        <br/>
                        <input className="signup-input-pc" type="text" id="email" name="email"/>
                        </label>
                    </div>
                    <div className="center-pc">
                        <label className="signup-label-pc">
                        Password
                        <br/>
                        <input className="signup-input-pc" type="password" id="password" name="password"/>
                        </label>
                    </div>
                    <br />
                    <div className="center-pc">
                        <div className="signup-button-pc" onClick={this.handleSignup}>Signup</div>
                    </div>
                </form>
                <div className="center-pc center-footer-pc">
                    <footer className="center-footer-pc">
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