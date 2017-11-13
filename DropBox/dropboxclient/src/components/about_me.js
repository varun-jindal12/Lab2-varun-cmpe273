import React,{Component} from 'react';
import {connect} from 'react-redux';


class AboutMe extends Component{
    render(){
        return(
            <div style={{marginTop:"8%"}} >
                <h2>Personal Details</h2>
                <div className="row col-md-12">
                    <div className="col-md-10" align = "center">
                        <table className="table table-hover" style={{width:"100%"}}>
                            <tr>
                                <td>name</td>
                                <td>{"\t"+this.props.userData.firstName +" "+ this.props.userData.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{"\t"+this.props.userData.emailID }</td>
                            </tr>
                            <tr>
                                <td>Gender </td>
                                <td>{"\t"+this.props.userData.gender }</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth </td>
                                <td>{"\t"+this.props.userData.dateOfBirth }</td>
                            </tr>
                            <tr>
                                <td>Work & Education </td>
                                <td>{"\t"+this.props.userData.workEdu }</td>
                            </tr>
                            <tr>
                                <td>Contact Info </td>
                                <td>{"\t"+this.props.userData.contactInfo }</td>
                            </tr>
                            <tr>
                                <td>Life Events </td>
                                <td>{"\t"+this.props.userData.lifeEvents }</td>
                            </tr>
                            <tr>
                                <td>Music Interest </td>
                                <td>{"\t"+this.props.userData.musicInterest}</td>
                            </tr>
                            <tr>
                                <td>Movie Interest </td>
                                <td>{"\t"+this.props.userData.movieInterest}</td>
                            </tr>
                            <tr>
                                <td>Sports Interest </td>
                                <td>{"\t"+this.props.userData.sportsInterest}</td>
                            </tr>
                        </table>
                        {/*Name {":\t"+this.props.userData.firstName +" "+ this.props.userData.lastName}<br/> <br/>
                        Email {":\t"+this.props.userData.emailID }<br/> <br/>
                        Gender {":\t"+this.props.userData.gender }<br/> <br/>
                        Date Of Birth {":\t"+this.props.userData.dateOfBirth }<br/> <br/>
                        Work & Education {":\t"+this.props.userData.workEdu }<br/> <br/>
                        Contact Info {":\t"+this.props.userData.contactInfo }<br/> <br/>
                        Life Events {":\t"+this.props.userData.lifeEvents }<br/> <br/>
                        Music Interest {":\t"+this.props.userData.musicInterest}<br/> <br/>
                        Movie Interest {":\t"+this.props.userData.movieInterest}<br/> <br/>
                        Sports Interest {":\t"+this.props.userData.sportsInterest}<br/> <br/>*/}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.activeWindow.userData.userData,

    }
}
export default connect (mapStateToProps)(AboutMe);