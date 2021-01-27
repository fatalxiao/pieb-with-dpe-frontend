/**
 * @file App.js
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

// Components
import Nav from './nav/Nav';
import NavTitle from './nav/title/NavTitle';
import PageLoading from 'alcedo-ui/PageLoading';

// Styles
import './App.scss';

const App = ({
    route, componentLoading,
    getGroups, getSensoryBlocks, getPatients
}) => {

    /**
     * init
     */
    useEffect(() => {
        getGroups?.();
        getSensoryBlocks?.();
        getPatients?.();
    }, []);

    return (
        <div className="app">

            <Nav/>

            <div className="app-content">

                <PageLoading visible={componentLoading}
                             showStripes={false}/>

                <NavTitle/>

                {renderRoutes(route.routes)}

            </div>

        </div>
    );

};

App.propTypes = {

    componentLoading: PropTypes.bool,

    getGroups: PropTypes.func,
    getSensoryBlocks: PropTypes.func,
    getPatients: PropTypes.func

};

export default connect(state => ({
    componentLoading: state.loadComponent.loading
}), dispatch => bindActionCreators({
    getGroups: actions.getGroups,
    getSensoryBlocks: actions.getSensoryBlocks,
    getPatients: actions.getPatients
}, dispatch))(App);
