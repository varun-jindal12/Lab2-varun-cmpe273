import React,{Component} from 'react';
import SignIn from './signIn';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSignUp} from '../actions/signIn-Up';
import SignUp from './signUp'
class Login extends Component{
    render(){
        if(this.props.activeWindow.pageType === "Sign Up") {
            return (
                <div>
                    <div className="container-fluid">
                        <img className="col-md-offset-5" src={require("../images/dropbox.png")} height={"13%"}
                             width={"13%"}/>
                        <div className="col-md-offset-4 col-md-4">
                        </div>
                        <hr style={{width: 10}}/>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={require("../images/sign-in-illo@2x-vflh_wJFN.png")} height={"60%"}
                                     width={"50%"} style={{marginTop: "10%", marginLeft: "40%"}}/>
                            </div>
                            <div className="col-md-6">
                                <SignUp/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <div className="container-fluid">
                        <img className="col-md-offset-5" src={require("../images/dropbox.png")} height={"13%"}
                             width={"13%"}/>
                        <div className="col-md-offset-4 col-md-4">
                        </div>
                        <hr style={{width: 10}}/>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={require("../images/sign-in-illo@2x-vflh_wJFN.png")} height={"60%"}
                                     width={"50%"} style={{marginTop: "10%", marginLeft: "40%"}}/>
                            </div>
                            <div className="col-md-6">
                                <SignIn/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
function mapStateToProps(state){
    return {
        activeWindow: state.activeWindow
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectSignUp:selectSignUp
    },dispatch);
}
export default connect (mapStateToProps,matchDispatchToProps)(Login);
// export default Login;