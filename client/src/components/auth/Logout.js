import React, {Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'
import { NavLink } from 'reactstrap'
import PropTypes from 'prop-types'

class Logout extends Component{

    static propTypes={
        logout: PropTypes.func.isRequired
    }

    render(){

        return(
            <div>
                <Fragment>
                    <NavLink onClick={this.props.logout} href="#">Logout</NavLink>
                </Fragment>
            </div>
        )
    }
}

//map state to props => null
export default connect(null,{logout})(Logout)