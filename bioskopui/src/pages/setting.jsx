import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { url } from '../components/url';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { gantiPassword } from '../redux/action';


class Setting extends Component {
  state = {
    backtohome: false
  };

  onClickgantipass = () => {
    var passNew = this.refs.passNew.value;
    var passOld = this.refs.passOld.value;
    var password = this.refs.confirmpass.value;

    var updatepassword = {
      username: this.props.username,
      password,
      role: this.props.role
    };

    if (passOld === "" || passNew === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password tidak boleh kosong"
      });
    } else if (passOld == passNew) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password baru tidak boleh sama dengan password lama"
      });
    } else if (passOld !== this.props.passuser) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password lama salah"
      });
    } else if (passNew !== password) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "konfirmasi password salah"
      });
    } else {
      Axios.patch(`${url}users/${this.props.userId}`, updatepassword)
        .then(res => {
          Swal.fire({
            title: "ARE YOU SURE ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes"
          }).then(result => {
            if (result.value) {
              this.props.gantiPassword(res.data);
              this.setState({ backtohome: true });
              Swal.fire({
                icon: "success",
                title: "YOU HAVE CHANGED THE PASSWORD !",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    if (this.state.backtohome || this.props.loginuser==false) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{height: "90vh" }}>
          <center>
        <div className="row " style={{ width: "20%" }}>
          <h1>Change Password</h1>
          <div>
            <label>Old Password</label>
            <input className="form-control" type="password" placeholder="Password" ref="passOld" />
          </div>
          <div>
            <label>New Password</label>
            <input className="form-control" type="password" placeholder="Password" ref="passNew" />
          </div>
          <div>
            <label>Re-enter Password</label>
            <input className="form-control" type="password" placeholder="Re-enter" ref="confirmpass" />
            <button onClick={this.onClickgantipass} className="btn btn-dark mt-4 mb-3" type="submit">Submit</button>
          </div>
          
        </div>
        </center>
      </div>
    );
  }
}
const MapstateToprops = state => {
  return {
    username: state.Auth.username,
    loginuser: state.Auth.login,
    userId: state.Auth.id,
    passuser: state.Auth.password,
    role: state.Auth.role
  };
};
export default connect(MapstateToprops, { gantiPassword })(Setting);