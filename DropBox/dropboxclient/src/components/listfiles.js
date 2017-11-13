import React , {Component} from 'react';

class ListFiles extends Component{

    render(){
        // const file = this.props;
        return(
            <div>
                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                        <div className="card col-md-12">
                            <div className="card-body">
                        <div className="col-md-5">
                            {this.props.item.fileName}
                        </div>
                        <div className="col-md-6" align="left">
                            <button type="button" className="btn btn-primary"
                                    // onClick={this.handleDownload(this.props.item.path)}>
                                   onClick= {() => this.props.handleDownload(this.props.item.path)}>
                                Download</button>
                            <button type="button" className="btn btn-primary" style={{marginLeft:10}}>
                                Delete
                            </button>
                        </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListFiles;