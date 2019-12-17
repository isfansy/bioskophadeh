import React, { Component } from 'react';
import './App.css';
import Homepage from './pages/home'
import Manageadmin from './pages/admin'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Pagenotfound from './pages/notfound'
import Axios from 'axios'
import {url} from './components/url'
import {connect} from 'react-redux'
import {LoginSuccessAction} from './redux/action'
import Moviedetail from './pages/moviedetail';
import Belitiket from './pages/belitiket'
import Cart from './pages/cart'
import History from './pages/history'
import Managestudio from './pages/managestudio';
import {TambahCart} from './redux/action/ActionCart'
import Header from './components/header'
import Setting from './pages/setting'

class App extends Component {

  state={
    loading:true
  }

  componentDidMount(){
    var id=localStorage.getItem('dino')
    Axios.get(`${url}users/${id}`)
    .then((res)=>{
      this.props.LoginSuccessAction(res.data)
      Axios.get(`${url}orders?userId=${id}`)
      .then((res1)=>{
        console.log(res1.data)
        this.props.TambahCart(res1.data.length)
        this.setState({loading:false})
      }).catch((err1)=>{
        console.log(err1)
      })
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      this.setState({loading:false})
    })
  }

  render(){
    if(this.state.loading){
      return <div> Loading...</div>
    }
  return ( 
    
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Homepage}></Route>
        <Route path='/admin' exact component={Manageadmin}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
        <Route path='/moviedetail/:id' exact component={Moviedetail}></Route>
        <Route path='/belitiket' exact component={Belitiket}></Route>
        <Route path='/cart' exact component={Cart}></Route>
        <Route path='/history' exact component={History}></Route>
        <Route path='/managestudio' exact component={Managestudio}></Route>
        <Route path='/setting' exact component={Setting}></Route>
        <Route path='/notfound' exact component={Pagenotfound}></Route>

        <Route path='/*' exact component={Pagenotfound}></Route>
      </Switch>
    </div>
  );
}
}

const MapstateToprops=(state)=>{
  return{
      AuthLog:state.Auth.login
  }
}

export default connect(MapstateToprops,{LoginSuccessAction,TambahCart})(App);
