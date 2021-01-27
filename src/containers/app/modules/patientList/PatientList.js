/**
 * @file PatientList.js
 */

import React, {Fragment, useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import PatientListFilter from './PatientListFilter';
import PatientListTable from './PatientListTable';
import NavNoPatient from 'containers/app/nav/patients/NavNoPatient';

// Styles
import './PatientList.scss';

const PatientList = ({
    groupList, patientList
}) => {

    const

        /**
         * id / name 文本 filter 的值
         */
        [filterValue, setFilterValue] = useState(''),

        /**
         * group filter 的值
         */
        [filterGroup, setFilterGroup] = useState(PatientList.ALL_GROUP),

        /**
         * status filter 的值
         */
        [filterStatus, setFilterStatus] = useState(PatientList.ALL_STATUS),

        /**
         * 最终 table 的值
         */
        tableData = useMemo(() => patientList.filter(item =>
            (item?.id?.includes(filterValue) || item?.name?.includes(filterValue))
            &&
            (filterGroup?.id === 0 ? true : item?.groupId === filterGroup?.id)
            &&
            (filterStatus?.id === -1 ? true : item?.status === filterStatus?.id)
        ), [patientList, filterValue, filterGroup, filterStatus]),

        /**
         * 处理 filter 变更
         * @type {Function}
         */
        handleFilterChange = useCallback((filterValue, filterGroup, filterStatus) => {
            setFilterValue(filterValue);
            setFilterGroup(filterGroup);
            setFilterStatus(filterStatus);
        }, []);

    return (
        <div className="patient-list">
            {
                patientList?.length > 0 ?
                    <Fragment>
                        <PatientListFilter filterValue={filterValue}
                                           groupList={[PatientList.ALL_GROUP, ...groupList]}
                                           filterGroup={filterGroup}
                                           statusList={PatientList.STATUS_LIST}
                                           filterStatus={filterStatus}
                                           onFilterChange={handleFilterChange}/>
                        <PatientListTable data={tableData}/>
                    </Fragment>
                    :
                    <NavNoPatient/>
            }
        </div>
    );

};

PatientList.ALL_GROUP = {
    id: 0,
    name: 'All Groups'
};

PatientList.ALL_STATUS = {
    id: -1,
    name: 'All Status'
};

PatientList.STATUS_LIST = [PatientList.ALL_STATUS, {
    id: 1,
    name: 'Enabled'
}, {
    id: 0,
    name: 'Disabled'
}];

PatientList.propTypes = {
    groupList: PropTypes.array,
    patientList: PropTypes.array
};

export default connect(state => ({
    groupList: state.group.list,
    patientList: state.patients.list
}))(PatientList);
