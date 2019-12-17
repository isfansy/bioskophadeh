import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'
import {LoginSuccessAction} from '../redux/action'
import {url} from '../components/url'
import {Redirect} from 'react-router-dom'



class Login extends Component {
    state = { 
        error:'',
        loading:false
     }


    onLoginClick=()=>{
        var username=this.refs.username.value
        var password=this.refs.password.value
        Axios.get(`${url}users?username=${username}&password=${password}`)
        .then(res=>{
            if(res.data.length){
                localStorage.setItem('dino',res.data[0].id)
                this.props.LoginSuccessAction(res.data[0])
            }else{
                this.setState({error:'Password is not match'})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() { 
        if(this.props.AuthLog){
            return <Redirect to={'/'}/>
        }
        return ( 
            <div>
                <div className="login-page">
                <div className="form">
                <center>
                        <h2>Silahkan Login</h2>
                        </center>
                    <form className="login-form">
                    <input ref="username" type="text" placeholder="username" />
                    <input ref="password" type="password" placeholder="password" />
                                    {this.state.error===''?
                                null
                                :
                                <div className="alert alert-danger mt-2">
                                    {this.state.error} <span onClick={()=>this.setState({error:''})} className='float-right font-weight-bold'>X</span>
                                </div>
                        
                                }
                    <button onClick={this.onLoginClick} >login</button>
                    <p className="message">Not registered? <a href="/register">Create an account</a></p>
                    </form>
                </div>
                </div>

            </div>
         );
    }
}
const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login
    }
}
 
export default connect(MapstateToprops,{LoginSuccessAction}) (Login);