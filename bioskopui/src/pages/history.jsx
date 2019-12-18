import React, { Component } from 'react';
import Header from '../components/header'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'



class History extends Component {
    state = {  }
    render() { 
        if(this.props.roleUser==='admin'){
            return <Redirect to='/notfound'/>
        }
        return (  
            <div>
                

                History
            </div>
        );
    }
    
}
 
const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        roleUser:state.Auth.role
    }
}

export default connect(MapstateToprops) (History);