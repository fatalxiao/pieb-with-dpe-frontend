/**
 * @file PatientList.js
 */

import React, {useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import PatientListFilter from './PatientListFilter';
import PatientListTable from './PatientListTable';
import NavNoPatient from 'modules/App/containers/nav/patients/NavNoPatient';

// Styles
import './PatientList.scss';

const PatientList = ({
    groupList, patientList
}) => {

    /**
     * id / name 文本 filter 的值
     */
    const [filterValue, setFilterValue] = useState('');

    /**
     * group filter 的值
     */
    const [filterGroup, setFilterGroup] = useState(PatientList.ALL_GROUP);

    /**
     * status filter 的值
     */
    const [filterStatus, setFilterStatus] = useState(PatientList.ALL_STATUS);

    /**
     * 最终 table 的值
     */
    const tableData = useMemo(() => {
        return patientList.filter(item =>
            (item?.id?.includes(filterValue) || item?.name?.includes(filterValue))
            &&
            (filterGroup?.id === 0 ? true : item?.groupId === filterGroup?.id)
            &&
            (filterStatus?.id === -1 ? true : item?.status === filterStatus?.id)
        );
    }, [
        patientList, filterValue, filterGroup, filterStatus
    ]);

    /**
     * 处理 filter 变更
     * @type {Function}
     */
    const handleFilterChange = useCallback((filterValue, filterGroup, filterStatus) => {
        setFilterValue(filterValue);
        setFilterGroup(filterGroup);
        setFilterStatus(filterStatus);
    }, []);

    return (
        <div className="patient-list">
            {
                patientList?.length > 0 ?
                    <>

                        <PatientListFilter filterValue={filterValue}
                                           groupList={[PatientList.ALL_GROUP, ...groupList]}
                                           filterGroup={filterGroup}
                                           statusList={PatientList.STATUS_LIST}
                                           filterStatus={filterStatus}
                                           onFilterChange={handleFilterChange}/>

                        <PatientListTable data={tableData}/>

                    </>
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
    groupList: state.patientGroup.list,
    patientList: state.patients.list
}))(PatientList);
