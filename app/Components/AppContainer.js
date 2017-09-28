import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

import App from './App'

class AppContainer extends Component{
    render(){
        return <App {...this.props} />
    }

}

function mapDispatchToPros(dispatch){
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {return {}}, mapDispatchToPros)(AppContainer);