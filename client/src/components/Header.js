import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

class Header extends Component{

    renderContent(){      
        switch(this.props.auth){

            case false:
                return <li><a href="/auth/google">Login</a></li>    
            case null:
                return 'awaiting verification'
            default:
                return [
                    <li key={0}><Payments /></li>,
                    <li key={1} style={{margin:'0 13px'}}> Credits : {this.props.auth.credits}</li>,
                    <li key={2}><a href="/api/logout">Logout</a></li>
                ]

        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">Web Client 1</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                    <li><a href="/surveys">Dashboard</a></li>
                    <li><a href="/api/current_user">Current Users</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}){
    return{ auth: auth };
}

export default connect(mapStateToProps)(Header);