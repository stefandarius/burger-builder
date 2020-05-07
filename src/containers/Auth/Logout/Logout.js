import React, {useEffect} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Logout = props => {

    useEffect(() => {
        props.onLogout();
    }, []);

    return <Redirect to="/" from={"/"}/>
};

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.logOut())
});

export default connect(null, mapDispatchToProps)(Logout);