/**
 * @file App.js
 */

import React, {useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'modules/App/reduxes/actions';
import * as actionTypes from 'modules/App/reduxes/actionTypes';

// Components
import Nav from './nav/Nav';
import NavTitle from './nav/title/NavTitle';
import PageLoading from 'alcedo-ui/PageLoading';
import ModuleLoading from 'components/module/loading/ModuleLoading';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './App.scss';

const App = ({
    route,
    componentLoading,
    getPatientGroupsActionType, getSensoryBlocksActionType,
    getObservalEndPointsActionType, getEpPlacementPointsActionType,
    getPatientGroups, getSensoryBlocks, getObservalEndPoints, getEpPlacementPoints,
    getPatients
}) => {

    /**
     * 是否正在加载基础数据
     * @type {*}
     */
    const loading = useMemo(() =>
        getPatientGroupsActionType !== actionTypes.GET_PATIENT_GROUPS_SUCCESS
        || getSensoryBlocksActionType !== actionTypes.GET_SENSORY_BLOCKS_SUCCESS
        || getObservalEndPointsActionType !== actionTypes.GET_OBSERVAL_END_POINT_SUCCESS
        || getEpPlacementPointsActionType !== actionTypes.GET_EP_PLACEMENT_POINT_SUCCESS, [
        getPatientGroupsActionType, getSensoryBlocksActionType,
        getObservalEndPointsActionType, getEpPlacementPointsActionType
    ]);

    /**
     * init
     */
    useEffect(() => {
        getPatientGroups?.();
        getSensoryBlocks?.();
        getObservalEndPoints?.();
        getEpPlacementPoints?.();
        getPatients?.();
    }, [
        getPatientGroups, getSensoryBlocks, getObservalEndPoints, getEpPlacementPoints,
        getPatients
    ]);

    return (
        <div className="app">

            <Nav/>

            <div className="app-content">

                <PageLoading visible={componentLoading}
                             showStripes={false}/>

                <NavTitle/>

                <div className="app-content-content">
                    <ModuleLoading loading={loading}>
                        {renderRoutes(route.routes)}
                    </ModuleLoading>
                </div>

            </div>

        </div>
    );

};

App.propTypes = {

    route: PropTypes.object,

    componentLoading: PropTypes.bool,
    getPatientGroupsActionType: PropTypes.string,
    getSensoryBlocksActionType: PropTypes.string,
    getObservalEndPointsActionType: PropTypes.string,
    getEpPlacementPointsActionType: PropTypes.string,

    getPatientGroups: PropTypes.func,
    getSensoryBlocks: PropTypes.func,
    getObservalEndPoints: PropTypes.func,
    getEpPlacementPoints: PropTypes.func,
    getPatients: PropTypes.func

};

export default connect(state => ({
    componentLoading: state.loadComponent.loading,
    getPatientGroupsActionType: state.patientGroup.actionType,
    getSensoryBlocksActionType: state.sensoryBlock.actionType,
    getObservalEndPointsActionType: state.observalEndPoint.actionType,
    getEpPlacementPointsActionType: state.epPlacementPoint.actionType
}), dispatch => bindActionCreators({
    getPatientGroups: actions.getPatientGroups,
    getSensoryBlocks: actions.getSensoryBlocks,
    getObservalEndPoints: actions.getObservalEndPoints,
    getEpPlacementPoints: actions.getEpPlacementPoints,
    getPatients: actions.getPatients
}, dispatch))(App);
