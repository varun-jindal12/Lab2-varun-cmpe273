import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSignIn} from '../actions/signIn-Up';
import {failedSignUp} from '../actions/afterFailedSignIn';
import axios from 'axios';

class SignUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            emailID:"",
            userPass:"",
            gender:"",
            dateOfBirth:"",
            workEdu:"",
            contactInfo:"",
            lifeEvents:"",
            musicInterest:"",
            movieInterest:"",
            sportsInterest:""
        };
    }
    afterSignUp = () =>{

        return axios.post('http://localhost:3005/register',this.state)
            .then( (res) =>{
                if(res.status === 200){
                    this.props.selectSignIn(res.data);
                }
                else{
                    this.props.failedSignUp(this.props.signUp);
                }


                // this.setState({
                //     ...this.state,
                //     result:res.data.result
                // });
            })
            .catch( (err) =>{
                this.props.failedSignUp(this.props.signUp);
            });
    };

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-sm-8 col-md-8 col-lg-8" style={{marginTop:"10%"}}>
                        <div className="col-md-12" style={{fontSize:20}}>Sign Up</div>
                        <div className="text-right col-md-8" > or <label className="text-primary" onClick={()=>this.props.selectSignIn(this.props.pageType)}> Sign in</label></div>
                        <form className="form-horizontal" >
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="FirstName" value = {this.state.firstName}
                                           id="FirstName" placeholder="First Name" onChange={(event)=>{this.setState({...this.state,firstName:event.target.value})}} width = {"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="email" className="form-control" name="LastName" value = {this.state.lastName}
                                           id="LastName" placeholder="Last Name" onChange={(event)=>{this.setState({...this.state,lastName:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="email" className="form-control" value = {this.state.emailID}
                                           name="Email" id="Email" onChange={(event)=>{this.setState({...this.state,emailID:event.target.value})}} placeholder="Email Id" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="password" className="form-control" name="UserPass" value = {this.state.userPass}
                                           id="UserPass" placeholder="Password" onChange={(event)=>{this.setState({...this.state,userPass:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="gender" value={this.state.gender}
                                           id="gender" placeholder="Gender" onChange={(event)=>{this.setState({...this.state,gender:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="date" className="form-control" name="dateOfBirth" value={this.state.dateOfBirth}
                                           id="datOfBirth" placeholder="Date Of birth" onChange={(event)=>{this.setState({...this.state,dateOfBirth:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="workEdu" value={this.state.workEdu}
                                           id="workEdu" placeholder="Work and Education" onChange={(event)=>{this.setState({...this.state,workEdu:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="contactInfo" value={this.state.contactInfo}
                                           id="contactInfo" placeholder="Contact Info" onChange={(event)=>{this.setState({...this.state,contactInfo:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="lifeEvents" value={this.state.lifeEvents}
                                           id="lifeEvents" placeholder="Tell us about your life events" onChange={(event)=>{this.setState({...this.state,lifeEvents:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="musicInterest" value={this.state.musicInterest}
                                           id="musicInterest" placeholder="Which music do you like" onChange={(event)=>{this.setState({...this.state,musicInterest:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="movieInterest" value={this.state.movieInterest}
                                           id="movieInterest" placeholder="What shows, movies do you like" onChange={(event)=>{this.setState({...this.state,movieInterest:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" name="sportsInterest" value={this.state.sportsInterest}
                                           id="sportsInterest" placeholder="What sports you like" onChange={(event)=>{this.setState({...this.state,sportsInterest:event.target.value})}} size ={"100%"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-8" align="right">
                                    <button type="button" className="btn btn-primary" onClick={this.afterSignUp}>register</button>
                                </div>
                            </div>
                            {this.props.signUp.signUpFailed}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        activeWindow: state.activeWindow,
        signUp:state.failedLogin
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectSignIn:selectSignIn,
        failedSignUp:failedSignUp
    },dispatch);
}
export default connect (mapStateToProps,matchDispatchToProps)(SignUp);
// export default SignUp;