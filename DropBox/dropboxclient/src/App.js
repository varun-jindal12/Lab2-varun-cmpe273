import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Login from './components/login';
import  {createStore} from 'redux';
import allReducers from './reducer';
import DropBox from './components/dropbox';
import DropBoxHome from './components/dropboxhome';

const store = createStore(allReducers)

class App extends Component {
  render() {
    return (
        <Provider store={store} >
                {/*<DropBox />*/}
            {/*<Login />*/}
            <DropBoxHome/>
        </Provider>
    );
  }
}

export default App;
