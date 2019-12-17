import React, { Component } from 'react';
import Header from '../components/header'
import Carouselhome from '../components/carousel'
import Homemovie from '../components/homemovie'

class Homepage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Carouselhome/>
                <Homemovie/>
            </div>
         );
    }
}
 
export default Homepage;