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

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './App.scss';

const App = ({

    route,
    componentLoading,
    getPatientGroupsActionType, getSensoryBlocksActionType,
    getObservalEndPointsActionType, getEpPlacementPointsActionType,

    dispatch

}) => {

    /**
     * 是否正在加载基础数据
     * @type {*}
     */
    const loading = useMemo(() => {
        return getPatientGroupsActionType !== 'patientGroup/getPatientGroupsSuccess'
            || getSensoryBlocksActionType !== 'sensoryBlock/getSensoryBlocksSuccess'
            || getObservalEndPointsActionType !== 'observalEndPoint/getObservalEndPointsSuccess'
            || getEpPlacementPointsActionType !== 'epPlacementPoint/getEpPlacementPointSuccess';
    }, [
        getPatientGroupsActionType, getSensoryBlocksActionType,
        getObservalEndPointsActionType, getEpPlacementPointsActionType
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

    dispatch: PropTypes.func

};

export default connect(state => ({
    componentLoading: state.moduleComponentLoading,
    getPatientGroupsActionType: state.patientGroup.actionType,
    getSensoryBlocksActionType: state.sensoryBlock.actionType,
    getObservalEndPointsActionType: state.observalEndPoint.actionType,
    getEpPlacementPointsActionType: state.epPlacementPoint.actionType
}))(App);
