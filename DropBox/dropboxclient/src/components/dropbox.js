import React,{Component} from 'react';
import Dashboard from './dashboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {aboutMeSelected} from "../actions/activeDropBoxWindow";
import {myFilesSelected} from "../actions/activeDropBoxWindow";
import {myGroupsSelected} from "../actions/activeDropBoxWindow";
import axios from 'axios';


class DropBox extends Component{

    getMyFiles = ()=>{
        return axios.post('http://localhost:3005/files/listFiles',this.props.userData.userData)
            .then( (res) =>{
                if(res.status === 200){
                    this.props.myFilesSelected(res.data.files);
                }
                else{
                    // this.props.failedSignIn(this.props.pageType);
                    console.log("status not 200:"+res.status);

                }
            })
            .catch( (err) =>{
                // this.props.failedSignIn(this.props.pageType);
                console.log("some error occurred");
            })
    }

    getMyInfo = ()=> {
        this.props.aboutMeSelected({});
    }
    getMyGroups = ()=>{

    }
    handleFileUpload = (event) => {

        const file = event.target.files[0];
        let data = new FormData();
        data.append('file', file);
        data.append('user', this.props.userData.userData.emailID);
        console.log(this.props.userData.userData);
        return axios.post('http://localhost:3005/files/upload', data)
            .then((response) => {
                console.log("file was successful success"+response);
            })
            .catch((error) =>{
                console.log("some error occurred"+error);
            });
    };

    render(){
        return(
            <div>

                {/*<h2>
                    Successfully logged in
                </h2>
             <div className="row">
                <div className="panel panel-primary col-md-3">
                    <li class="list-group-item">First item</li>
                    <li class="list-group-item">Second item</li>
                    <li class="list-group-item">Third item</li>
                </div>
                 <div className="container-fluid"></div>
            </div>*/}
            <div className="row col-md-12">
            <div className="col-md-2">
                <nav className="w3-sidebar " style={{zIndex:3,width:"15%",backgroundColor:"#FAFAFA"}} id="mySidebar"><br/>
                    <div className="w3-container w3-row">
                        <div className="w3-col s4">
                            {/*<img src="/w3images/avatar2.png" className="w3-circle w3-margin-right" style={{width:46}}/>*/}
                        </div>
                        <div className="w3-col s8 w3-bar">
                            {/*<span>Welcome,{this.props.data.username}</span><br/>*/}
                            {/*<a href="#" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>*/}
                            <a href="#" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a><span>Welcome,
                            <br/>{this.props.userData.userData.firstName}</span>
                            {/*<a href="#" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>*/}
                        </div>
                    </div>
                    <hr/>
                        <div className="w3-container">
                            <h5>DropBox</h5>
                        </div>
                        <div className="w3-bar-block">
                            {/*<a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>*/}
                            <button onClick={this.getMyFiles} className="w3-bar-item w3-button w3-padding">  My Files</button>
                            <button onClick={this.getMyInfo} className="w3-bar-item w3-button w3-padding">  About Me</button>
                            <button onClick={this.getMyGroups} className="w3-bar-item w3-button w3-padding">  Groups</button>
                            <br/><br/>
                        </div>
                </nav>
            </div>
                <div className="container-fluid col-md-8">
                    <Dashboard/>
                </div>
                <div className="col-md-2" style={{marginTop:"10%"}}>
                    <div classname="row justify-content-md-center">
                        <h3>Upload File</h3>
                    </div>
                    <input type="file" name="upload File" className="col-md-12"  align="center" onChange={this.handleFileUpload} change/>
                    <div className="row col-md-12" style={{marginTop:"30%"}}>
                    <img className="img img-responsive col-md-12" src={require("../images/unlock_more_space.png")} style={{marginTop:"10%",width:"100%"}}/>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.activeWindow.userData,

    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        aboutMeSelected:aboutMeSelected,
        myFilesSelected:myFilesSelected,
        myGroupsSelected:myGroupsSelected
    },dispatch);
}
export default connect (mapStateToProps,matchDispatchToProps)(DropBox);