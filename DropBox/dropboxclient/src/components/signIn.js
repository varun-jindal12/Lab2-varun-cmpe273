import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSignUp} from '../actions/signIn-Up';
import {failedSignIn} from "../actions/afterFailedSignIn";
import {userNameValue} from '../actions/signInForm';
import {userPassValue} from '../actions/signInForm';
import {loginSuccess} from '../actions/userLogIn';
import axios from 'axios';


class SignIn extends Component{
/*    constructor(props) {
        super(props);
        this.state ={
          inputValue:"",
          inputPass:""
        };
    }*/
    afterSignIn = ()=>{
        var username = this.props.pageType.inputValue;
        var pass = this.props.pageType.inputPass;
        var credentials = {"username":username,"password":pass};
        /*{"username":document.getElementById('inputUsername').value,
                            "password":document.getElementById('inputPassword').value};*/
//JSON.stringify(credentials)
        return axios.post('http://localhost:3005/login',credentials)
            .then( (res) =>{
                if(res.status === 200){
                    this.props.loginSuccess(res.data);
                }
                else{
                    this.props.failedSignIn(this.props.pageType);
                }


                // this.setState({
                //     ...this.state,
                //     result:res.data.result
                // });
            })
            .catch( (err) =>{
                this.props.failedSignIn(this.props.pageType);
            })
    };


    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-sm-8 col-md-8 col-lg-8" style={{marginTop:"10%"}}>
                        <div className="col-md-12" style={{fontSize:20}}>Sign in</div>
                        <div className="text-right col-md-8" > or <label className="text-primary" onClick={()=>this.props.selectSignUp(this.props.pageType)}> Create an account</label></div>
                                <form className="form-horizontal" >
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <input type="email" className="form-control" value ={this.props.pageType.inputValue}
                                                   id="inputUsername" placeholder="Email Id" onChange={(event)=>this.props.getUserName(event.target.value)} width ={"100%"}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <input type="password" className="form-control" value ={this.props.pageType.inputPass}
                                                   name="inputPassword" id="inputPassword" onChange={(event)=>this.props.getUserPass(event.target.value)} placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div
                                            className="col-md-8" align={"right"}>
                                            <button type="button" className="btn btn-primary" onClick={this.afterSignIn} >Sign in</button>
                                            {this.props.failedLogin.SignInFail}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}
function mapStateToProps(state){
    return {
        pageType: state.activeWindow,
        failedLogin:state.failedLogin
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectSignUp:selectSignUp,
        failedSignIn:failedSignIn,
        getUserName:userNameValue,
        getUserPass:userPassValue,
        loginSuccess:loginSuccess
    },dispatch);
}
export default connect (mapStateToProps,matchDispatchToProps)(SignIn);
