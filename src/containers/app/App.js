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
    getPatientGroups, getSensoryBlocks, getPatients
}) => {

    /**
     * init
     */
    useEffect(() => {
        getPatientGroups?.();
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

                <div className="app-content-content">
                    {renderRoutes(route.routes)}
                </div>

            </div>

        </div>
    );

};

App.propTypes = {

    route: PropTypes.object,

    componentLoading: PropTypes.bool,

    getPatientGroups: PropTypes.func,
    getSensoryBlocks: PropTypes.func,
    getPatients: PropTypes.func

};

export default connect(state => ({
    componentLoading: state.loadComponent.loading
}), dispatch => bindActionCreators({
    getPatientGroups: actions.getPatientGroups,
    getSensoryBlocks: actions.getSensoryBlocks,
    getPatients: actions.getPatients
}, dispatch))(App);
