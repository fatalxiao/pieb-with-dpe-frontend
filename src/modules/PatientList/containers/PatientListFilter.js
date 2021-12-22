/**
 * @file PatientListFilter.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import TextField from 'customized/MaterialTextField';
import RaisedButton from 'alcedo-ui/RaisedButton';
import DropdownSelect from 'customized/MaterialDropdownSelect';
import AddPatientDialog from 'modules/PatientEditor/containers/patientBaseInfo/AddPatientDialog';

// Styles
import './PatientListFilter.scss';

const PatientListFilter = ({
    filterValue, groupList, filterGroup, statusList, filterStatus,
    resetPatientBaseInfo, onFilterChange
}) => {

    /**
     * add patient dialog 是否显示的标志
     */
    const [addPatientDialogVisible, setAddPatientDialogVisible] = useState(false);

    /**
     * 处理 patient filter 的变更
     * @type {Function}
     */
    const handlePatientFilterChange = useCallback(value => {
        onFilterChange?.(value, filterGroup, filterStatus);
    }, [
        filterGroup, filterStatus,
        onFilterChange
    ]);

    /**
     * 处理 group filter 的变更
     * @type {Function}
     */
    const handleGroupFilterChange = useCallback(value => {
        onFilterChange?.(filterValue, value, filterStatus);
    }, [
        filterValue, filterStatus,
        onFilterChange
    ]);

    /**
     * 处理 status filter 的变更
     * @type {Function}
     */
    const handleStatusFilterChange = useCallback(value => {
        onFilterChange?.(filterValue, filterGroup, value);
    }, [
        filterValue, filterGroup,
        onFilterChange
    ]);

    /**
     * 显示 add patient dialog
     * @type {Function}
     */
    const showAddPatientDialog = useCallback(() => {
        setAddPatientDialogVisible(true);
        resetPatientBaseInfo?.();
    }, [
        resetPatientBaseInfo
    ]);

    /**
     * 隐藏 add patient dialog
     * @type {Function}
     */
    const hideAddPatientDialog = useCallback(() => {
        setAddPatientDialogVisible(false);
    }, []);

    return (
        <div className="patient-list-filter">

            <RaisedButton className="create-patient-button"
                          theme={RaisedButton.Theme.HIGHLIGHT}
                          iconCls="icon-plus"
                          value="Create Patient"
                          onClick={showAddPatientDialog}/>

            <AddPatientDialog visible={addPatientDialogVisible}
                              onRequestClose={hideAddPatientDialog}/>

            <div className="patient-filter-wrapper">

                <DropdownSelect className="group-select"
                                data={groupList}
                                valueField="id"
                                displayField="name"
                                value={filterGroup}
                                onChange={handleGroupFilterChange}/>

                <DropdownSelect className="status-select"
                                data={statusList}
                                valueField="id"
                                displayField="name"
                                value={filterStatus}
                                onChange={handleStatusFilterChange}/>

                <TextField className="patient-filter"
                           value={filterValue}
                           placeholder="Search"
                           rightIconCls="icon-magnifying-glass"
                           onChange={handlePatientFilterChange}/>

            </div>

        </div>
    );

};

PatientListFilter.propTypes = {

    filterValue: PropTypes.string,
    groupList: PropTypes.array,
    filterGroup: PropTypes.object,
    statusList: PropTypes.array,
    filterStatus: PropTypes.object,

    resetPatientBaseInfo: PropTypes.func,
    onFilterChange: PropTypes.func

};

export default connect(null, dispatch => bindModelActionCreators({
    resetPatientBaseInfo: 'patientBaseInfo/resetPatientBaseInfo'
}, dispatch))(PatientListFilter);
