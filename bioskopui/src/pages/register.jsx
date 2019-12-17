import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Axios from 'axios'
import {url} from '../components/url'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'


class Register extends Component {
    state = { 
        kelogin:false
     }

    onClickRegister = (e) => {
        e.preventDefault()
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var repassword = this.refs.repassword.value;
        var role = "user";
        var newUser = { username, password, role };
        if (username === "" || password === "" || repassword === "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Data Gaboleh Ada Yang Kosong!"
          });
        } else {
          Axios.get(`${url}users?username=${username}`)
            .then(res1 => {
              console.log(res1);
              if (res1.data.length === 0) {
                if (password !== repassword) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password must match"
                  });
                } else {
                  Axios.post(`${url}users`, newUser)
                    .then(res => {
                      Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Your are success Registered! Please Login"
                      });
                      this.setState({ kelogin: true });
                      
                    })
                    .catch(err1 => {
                      console.log(err1);
                    });
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `"${username}" is not Available, Try Using Another Username :`
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      };

    render() { 
        if(this.state.kelogin){
            return <Redirect to={'/login'}/>
        }
        return ( 
            <div>
                <div className="login-page">
                <div className="form">
                <center>
                        <h2>Silahkan Register</h2>
                        </center>
                    <form className="login-form" onSubmit={this.onClickRegister}>
                    <input ref='username' type="text" placeholder="username" />
                    <input ref='password'type="password" placeholder="password" />
                    <input ref='repassword' type="password" placeholder="confirm password" />
                    <button onClick={this.onClickRegister} type='submit'>Register</button>
                    <p className="message">Already Registered?<a href="/login">Please login</a></p>
                    </form>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Register;