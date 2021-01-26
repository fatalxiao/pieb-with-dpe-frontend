/**
 * @file PatientListTable.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import {NavLink} from 'react-router-dom';
import Table from 'alcedo-ui/Table';
import Switcher from 'alcedo-ui/Switcher';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import TextField from 'customized/CustomizedMaterialTextField';

// Vendors
import debounce from 'lodash/debounce';

// Styles
import 'scss/containers/app/modules/patientList/PatientListTable.scss';

const PatientListTable = ({
    groupList, data,
    updatePatientName, updatePatientGroup, enablePatient, disablePatient
}) => {

    // data 为空时显示 no patient
    if (!data || data.length < 1) {
        return (
            <div className="no-patient-found">
                No Patient Found
            </div>
        );
    }

    const

        /**
         * 处理 patient name 的变更
         * @type {debounced}
         */
        handleNameChange = useCallback(debounce((id, value) =>
                updatePatientName?.(id, value),
            400
        ), [updatePatientName]),

        /**
         * 处理 patient group 的变更
         * @type {function(*=, *=): *}
         */
        handleGroupChange = useCallback((id, value) =>
                updatePatientGroup?.(id, value),
            [updatePatientGroup]
        ),

        /**
         * 处理 patient status 的变更
         * @type {function(*=, *): *}
         */
        handleStatusChange = useCallback((id, value) => value ?
            enablePatient?.(id)
            :
            disablePatient?.(id),
            [enablePatient, disablePatient]
        ),

        /**
         * 所有 columns 的配置
         * @type {*[]}
         */
        columns = useMemo(() => [{
            key: 'id',
            headRenderer: 'ID',
            bodyRenderer: rowData =>
                <NavLink className="id-link"
                         to={`/app/patient/info/${rowData.id}`}>
                    {rowData.id}
                </NavLink>,
            sortable: true,
            sortingProp: 'id'
        }, {
            key: 'name',
            headRenderer: 'Name',
            bodyRenderer: rowData =>
                <TextField className="hover-activated name-field"
                           value={rowData.name}
                           onChange={value => handleNameChange(rowData.id, value)}/>,
            sortable: true,
            sortingProp: 'name'
        }, {
            key: 'group',
            headRenderer: 'Group',
            bodyRenderer: rowData =>
                <DropdownSelect className="hover-activated group-select"
                                data={groupList}
                                valueField="id"
                                displayField="name"
                                value={rowData.group}
                                onChange={value => handleGroupChange(rowData.id, value)}/>,
            sortable: true,
            sortingProp: 'groupId'
        }, {
            key: 'status',
            headRenderer: 'Status',
            bodyRenderer: rowData =>
                <Switcher value={rowData.status === 1}
                          size={Switcher.Size.SMALL}
                          onChange={value => handleStatusChange(rowData.id, value)}/>,
            sortable: true,
            sortingProp: 'status'
        }], [
            groupList,
            handleNameChange, handleGroupChange, handleStatusChange
        ]);

    return (
        <Table className="patient-list-table"
               data={data}
               columns={columns}/>
    );

};

PatientListTable.propTypes = {

    groupList: PropTypes.array,
    data: PropTypes.array,

    updatePatientName: PropTypes.func,
    updatePatientGroup: PropTypes.func,
    enablePatient: PropTypes.func,
    disablePatient: PropTypes.func

};

export default connect(state => ({
    groupList: state.group.list
}), dispatch => bindActionCreators({
    updatePatientName: actions.updatePatientName,
    updatePatientGroup: actions.updatePatientGroup,
    enablePatient: actions.enablePatient,
    disablePatient: actions.disablePatient
}, dispatch))(PatientListTable);
