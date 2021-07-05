/**
 * @file NavBarTop.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import IconButton from 'alcedo-ui/IconButton';
import AddPatientDialog from 'modules/PatientEditor/containers/patientBaseInfo/AddPatientDialog';
import NavSearch from './NavSearch';

// Statics
import config from 'src/config';
import {DEFAULT_ROUTE} from 'src/config.routes';

// Vendors
import classNames from 'classnames';

// Styles
import './NavBarTop.scss';

const NavBarTop = ({
    children, isFold,
    dispatch, resetPatientBaseInfo
}) => {

    /**
     * 是否显示查询抽屉
     * @type {React.MutableRefObject<undefined>}
     */
    const [searchDrawerVisible, setSearchDrawerVisible] = useState(false);

    /**
     * 是否显示新建患者对话框
     * @type {React.MutableRefObject<undefined>}
     */
    const [addPatientDialogVisible, setAddPatientDialogVisible] = useState(false);

    /**
     * 跳转到落地页
     * @type {function(): *}
     */
    const goToLanding = useCallback(() => {
        dispatch?.({
            type: 'route/push',
            route: DEFAULT_ROUTE
        });
    }, [
        dispatch
    ]);

    /**
     * 切换查询抽屉显示/隐藏
     * @type {function(): void}
     */
    const toggleSearch = useCallback(() => {
        setSearchDrawerVisible(!searchDrawerVisible);
    }, [
        searchDrawerVisible
    ]);

    /**
     * 隐藏查询抽屉
     * @type {function(): void}
     */
    const hideSearch = useCallback(() => {
        setSearchDrawerVisible(false);
    }, []);

    /**
     * 显示新建患者对话框
     * @type {Function}
     */
    const showAddPatient = useCallback(() => {
        setAddPatientDialogVisible(true);
        resetPatientBaseInfo?.();
    }, [
        resetPatientBaseInfo
    ]);

    /**
     * 隐藏新建患者对话框
     * @type {function(): void}
     */
    const hideAddPatient = useCallback(() => {
        setAddPatientDialogVisible(false);
    }, []);

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

            <a className="nav-bar-export-button-anchor"
               href={`${config.appBaseUrl}/patient/exportPatients`}>
                <IconButton className="nav-bar-item nav-bar-export-button"
                            iconCls="icon-download"
                            tip="Export"
                            tipPosition={IconButton.TipPosition.RIGHT}/>
            </a>

            <NavSearch visible={searchDrawerVisible}
                       onRequestClose={hideSearch}/>

            <AddPatientDialog visible={addPatientDialogVisible}
                              onRequestClose={hideAddPatient}/>

            {children}

        </div>
    );

};

NavBarTop.propTypes = {

    children: PropTypes.any,
    isFold: PropTypes.bool,

    dispatch: PropTypes.func

};

export default connect()(NavBarTop);
