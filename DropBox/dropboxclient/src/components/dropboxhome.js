import React,{Component} from 'react';
import {connect} from 'react-redux';
import DropBox from './dropbox';
import Login from './login';

class DropBoxHome extends Component{
    render(){
        if(this.props.activeWindow.isLoggedIn === true){
            return(
                <DropBox/>
            );
        }
        else{
            return(
                <Login/>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        activeWindow: state.activeWindow
    }
}

export default connect (mapStateToProps)(DropBoxHome);