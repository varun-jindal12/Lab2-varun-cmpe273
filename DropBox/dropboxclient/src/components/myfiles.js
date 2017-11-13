import React,{Component} from 'react';
import {connect} from 'react-redux';
import ListFiles from './listfiles';

class MyFiles extends Component{
    handleDownload = (path)=>{
        console.log("path is");
        console.log(path);
        window.open(path);
    }
    render(){
        return(
            <div style={{marginTop:"8%"}}>
                <h2>My File</h2>
                <div className="row justify-content-md-center">
                    <div className="card col-md-12">
                        <div className="card-body">
                            {
                                this.props.myFiles.map((file,index) => {
                                    return(
                                        <ListFiles
                                            key={index}
                                            item={file}
                                            handleDownload={this.handleDownload}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.activeWindow.userData.userData,
        myFiles:state.activeWindow.myFiles

    }
}
export default connect (mapStateToProps)(MyFiles);