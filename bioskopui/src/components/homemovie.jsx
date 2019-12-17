import React, { Component } from 'react';
import Axios from 'axios'
import {url} from './url'
import {Link} from 'react-router-dom'

class Homemovie extends Component {
    state = { 
        moviedata:[]
     }
     componentDidMount(){
         Axios.get(`${url}movies`)
         .then((res)=>{
             this.setState({moviedata:res.data})
            //  console.log(res)
         }).catch((err)=>{
             console.log(err)
         })
     }
     renderMovies=()=>{
         return this.state.moviedata.map((val,index)=>{
             return ( 
             <div key={index} className="col-md-3 py-5 pr-3 pl-1 ">
             <div className="card kartu " style={{width: '100%',height:'500px'}}>
                 <div className="gambaar1">
                     <Link to={'/moviedetail/' + val.id}>

                     <img src={val.image} style={{height:'400px'}} className="card-img-top kartu gambar" alt="..." />
                     </Link>
                 </div>
                 <div className="card-body">
                     <h5 className="card-title">{val.title}</h5>
                 </div>
             </div>
         </div>

             )
         })
     }

    render() { 
        return (
                <div>
                <div>
                <div className='mx-5'>
                <div className="row py-5 " style={{paddingLeft: '10%', paddingRight: '10%'}}>
                {this.renderMovies()}
                </div>
                </div>
                </div>

                </div>
          );
    }
}
 
export default Homemovie;