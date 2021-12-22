/**
 * @file App.js
 */

import React, {useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import Nav from './nav/Nav';
import NavTitle from './nav/title/NavTitle';
import PageLoading from 'alcedo-ui/PageLoading';
import ModuleLoading from 'components/module/loading/ModuleLoading';

// Statics
import {ApiStatus} from 'vivy-api';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './App.scss';

const App = ({

    route,

    asyncComponentLoading,

    getPatientGroupsStatus, getSensoryBlocksStatus,
    getObservalEndPointsStatus, getEpPlacementPointsStatus,

    getPatientGroups, getSensoryBlocks, getObservalEndPoints, getEpPlacementPoints, getPatients

}) => {

    /**
     * 是否正在加载基础数据
     * @type {*}
     */
    const loading = useMemo(() => {
        return getPatientGroupsStatus !== ApiStatus.SUCCESS
            || getSensoryBlocksStatus !== ApiStatus.SUCCESS
            || getObservalEndPointsStatus !== ApiStatus.SUCCESS
            || getEpPlacementPointsStatus !== ApiStatus.SUCCESS;
    }, [
        getPatientGroupsStatus, getSensoryBlocksStatus,
        getObservalEndPointsStatus, getEpPlacementPointsStatus
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

                <PageLoading visible={asyncComponentLoading}
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

    asyncComponentLoading: PropTypes.bool,

    getPatientGroupsStatus: PropTypes.string,
    getSensoryBlocksStatus: PropTypes.string,
    getObservalEndPointsStatus: PropTypes.string,
    getEpPlacementPointsStatus: PropTypes.string,

    getPatientGroups: PropTypes.func,
    getSensoryBlocks: PropTypes.func,
    getObservalEndPoints: PropTypes.func,
    getEpPlacementPoints: PropTypes.func,
    getPatients: PropTypes.func

};

export default connect(state => ({

    asyncComponentLoading: state.asyncComponentLoading,

    getPatientGroupsStatus: state.apiStatus.patientGroup?.getPatientGroups,
    getSensoryBlocksStatus: state.apiStatus.sensoryBlock?.getSensoryBlocks,
    getObservalEndPointsStatus: state.apiStatus.observalEndPoint?.getObservalEndPoints,
    getEpPlacementPointsStatus: state.apiStatus.epPlacementPoint?.getEpPlacementPoints

}), dispatch => bindModelActionCreators({
    getPatientGroups: 'patientGroup/getPatientGroups',
    getSensoryBlocks: 'sensoryBlock/getSensoryBlocks',
    getObservalEndPoints: 'observalEndPoint/getObservalEndPoints',
    getEpPlacementPoints: 'epPlacementPoint/getEpPlacementPoints',
    getPatients: 'patients/getPatients'
}, dispatch))(App);
