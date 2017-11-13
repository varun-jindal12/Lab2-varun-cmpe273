import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AboutMe from './about_me';
import MyFiles from './myfiles';

class Dashboard extends Component{
    render(){
        if(this.props.activeWindow.dropBoxWindow === 'my_files'){
            return(
                <div>
                    <MyFiles/>
                </div>
            )
        }
        else if(this.props.activeWindow.dropBoxWindow === 'my_groups'){
            return(
                <div>

                </div>
            )
        }
        else{
            return(
                <div>
                    <AboutMe/>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return {
        activeWindow: state.activeWindow,
        signUp:state.failedLogin
    }
}

export default connect (mapStateToProps)(Dashboard);