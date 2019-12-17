import React, { Component } from 'react';
import Header from '../components/header'
import Axios from 'axios';
import {url} from '../components/url'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Button,Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'


class Moviedetail extends Component {
    state = { 
        datamoviedetail:{},
        trailer:false,
        belitiket:false,
        notloginyet:false,
        kelogin:false,
        keregister:false

     }
     componentDidMount(){
       
         Axios.get(`${url}movies/${this.props.match.params.id}`)
         .then((res)=>{
             console.log(res)
             this.setState({datamoviedetail:res.data})
         }).catch((err)=>{
             console.log(err)
         })
     }
     onBeliTiketClick=()=>{
         if(this.props.AuthLog){
             this.setState({belitiket:true})
         }else{
             this.setState({notloginyet:true})
         }
     }


    render() { 
        if(this.state.kelogin){
            return <Redirect to={'/login'}/>
        }
        if(this.state.keregister){
            return <Redirect to={'/register'}/>
        }
        if(this.state.belitiket){
            return <Redirect to={{pathname:'/belitiket',state:this.state.datamoviedetail}}/>
        }

        return (  
            <div>
                <Modal isOpen={this.state.notloginyet} centered toggle={() => this.setState({ notloginyet: false })}>
                <ModalBody>
                    Silahkan Login atau Register dulu untuk membeli Tiket.
                </ModalBody>
                <ModalFooter>
                    <Button className='info' onClick={() => this.setState({ kelogin: true })}>LOGIN</Button>
                    <Button variant="danger" onClick={() => this.setState({ keregister: true })}>REGISTER</Button>


                </ModalFooter>
            </Modal>
                <Modal isOpen={this.state.trailer} toggle={()=>this.setState({trailer:false})}>
                <iframe width="560" height="315" src={this.state.datamoviedetail.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Modal>
                <div>
                    
                    <div className="container ">
                        <div className='row'>
                            <div className='col-md-4'>
                                
                                <img src={this.state.datamoviedetail.image}/>
                            </div>
                            <div className='col-md-8'>
                                <h3>{this.state.datamoviedetail.title}</h3>
                                <h4>{this.state.datamoviedetail.genre}</h4>
                                <h5>Sinopsis</h5>
                                <p>{this.state.datamoviedetail.synopsys}</p>
                                <p style={{fontWeight:'bold'}}>{this.state.datamoviedetail.sutradara}</p>
                                <Button className='mr-2' onClick={this.onBeliTiketClick} color="primary" >Buy Tickets</Button>
                                <Button color="info" onClick={()=>this.setState({trailer:true})} >Trailer</Button>
                                
                            </div>  
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}

const MapstateToprops = (state)=>{
    return{
        AuthLog: state.Auth.login,

    }
}
 
export default connect (MapstateToprops)(Moviedetail);