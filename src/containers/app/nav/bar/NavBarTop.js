/**
 * @file NavBarTop.js
 */

import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import IconButton from 'alcedo-ui/IconButton';
import DownloadField from 'alcedo-ui/DownloadField';
import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';
import NavSearch from './NavSearch';

// Statics
import config from 'src/config';
import {DEFAULT_ROUTE} from 'src/config.routes';

// Vendors
import classNames from 'classnames';

// Styles
import 'scss/containers/app/nav/bar/NavBarTop.scss';

const NavBarTop = ({
    children, isFold,
    routerPush, resetPatientBaseInfo
}) => {

    const

        /**
         * Download Field 的 Ref
         * @type {React.MutableRefObject<undefined>}
         */
        downloadFieldRef = useRef(),

        /**
         * 是否显示查询抽屉
         * @type {React.MutableRefObject<undefined>}
         */
        [searchDrawerVisible, setSearchDrawerVisible] = useState(false),

        /**
         * 是否显示新建患者对话框
         * @type {React.MutableRefObject<undefined>}
         */
        [addPatientDialogVisible, setAddPatientDialogVisible] = useState(false),

        /**
         * 跳转到落地页
         * @type {function(): *}
         */
        goToLanding = useCallback(() => routerPush?.(DEFAULT_ROUTE), [routerPush]),

        /**
         * 切换查询抽屉显示/隐藏
         * @type {function(): void}
         */
        toggleSearch = useCallback(() => setSearchDrawerVisible(!searchDrawerVisible), [searchDrawerVisible]),

        /**
         * 隐藏查询抽屉
         * @type {function(): void}
         */
        hideSearch = useCallback(() => setSearchDrawerVisible(false), []),

        /**
         * 显示新建患者对话框
         * @type {Function}
         */
        showAddPatient = useCallback(() => {
            setAddPatientDialogVisible(true);
            resetPatientBaseInfo?.();
        }, [resetPatientBaseInfo]),

        /**
         * 隐藏新建患者对话框
         * @type {function(): void}
         */
        hideAddPatient = useCallback(() => setAddPatientDialogVisible(false), []),

        /**
         * 导出 Excel
         * @type {function(): *}
         */
        exportExcel = useCallback(() => downloadFieldRef?.current?.download?.(), [downloadFieldRef]);

    return (
        <div className={classNames('nav-bar-top', {
            fold: isFold,
            'search-drawer-visible': searchDrawerVisible
        })}>

            <IconButton className="nav-bar-item nav-bar-logo-button"
                        onClick={goToLanding}>
                <div className="logo"/>
                <div className="logo-animated"/>
            </IconButton>

            <IconButton className="nav-bar-item nav-bar-search-button"
                        iconCls={searchDrawerVisible ? 'icon-reply' : 'icon-magnifying-glass'}
                        tip={searchDrawerVisible ? 'Back' : 'Search'}
                        tipPosition={IconButton.TipPosition.RIGHT}
                        onClick={toggleSearch}/>

            <IconButton className="nav-bar-item"
                        iconCls="icon-plus"
                        tip="Add Patient"
                        tipPosition={IconButton.TipPosition.RIGHT}
                        onClick={showAddPatient}/>

            <IconButton className="nav-bar-item nav-bar-export-button"
                        iconCls="icon-download"
                        tip="Export"
                        tipPosition={IconButton.TipPosition.RIGHT}
                        onClick={exportExcel}/>

            <NavSearch visible={searchDrawerVisible}
                       onRequestClose={hideSearch}/>

            <AddPatientDialog visible={addPatientDialogVisible}
                              onRequestClose={hideAddPatient}/>

            <DownloadField ref={downloadFieldRef}
                           url={`${config.appBaseUrl}/patient/exportPatients`}/>

            {children}

        </div>
    );

};

NavBarTop.propTypes = {

    isFold: PropTypes.bool,

    routerPush: PropTypes.func,
    resetPatientBaseInfo: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    resetPatientBaseInfo: actions.resetPatientBaseInfo
}, dispatch))(NavBarTop);
