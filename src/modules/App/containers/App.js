/**
 * @file App.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

    dispatch

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
     * 获取 Patient Groups
     * @type {(function(): void)|*}
     */
    const getPatientGroups = useCallback(() => {
        dispatch({
            type: 'patientGroup/getPatientGroups'
        });
    }, [
        dispatch
    ]);

    /**
     * 获取所有的 Sensory Blocks
     * @type {(function(): void)|*}
     */
    const getSensoryBlocks = useCallback(() => {
        dispatch({
            type: 'sensoryBlock/getSensoryBlocks'
        });
    }, [
        dispatch
    ]);

    /**
     * 获取所有的 Observal End Point
     * @type {(function(): void)|*}
     */
    const getObservalEndPoints = useCallback(() => {
        dispatch({
            type: 'observalEndPoint/getObservalEndPoints'
        });
    }, [
        dispatch
    ]);

    /**
     * 获取所有的 Ep Placement Point
     * @type {(function(): void)|*}
     */
    const getEpPlacementPoints = useCallback(() => {
        dispatch({
            type: 'epPlacementPoint/getEpPlacementPoints'
        });
    }, [
        dispatch
    ]);

    /**
     * 获取用于表格的 patients 数据
     * @type {(function(): void)|*}
     */
    const getPatients = useCallback(() => {
        dispatch({
            type: 'patients/getPatients'
        });
    }, [
        dispatch
    ]);

    /**
     * init
     */
    useEffect(() => {
        getPatientGroups();
        getSensoryBlocks();
        getObservalEndPoints();
        getEpPlacementPoints();
        getPatients();
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

    dispatch: PropTypes.func

};

export default connect(state => ({

    asyncComponentLoading: state.asyncComponentLoading,

    getPatientGroupsStatus: state.apiStatus.patientGroup?.getPatientGroups,
    getSensoryBlocksStatus: state.apiStatus.sensoryBlock?.getSensoryBlocks,
    getObservalEndPointsStatus: state.apiStatus.observalEndPoint?.getObservalEndPoints,
    getEpPlacementPointsStatus: state.apiStatus.epPlacementPoint?.getEpPlacementPoints

}))(App);
