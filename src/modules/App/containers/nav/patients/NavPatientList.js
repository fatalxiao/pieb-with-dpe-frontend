/**
 * @file NavPatientList.js
 */

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import NavPatientListItem from './NavPatientListItem';

// Vendors
import Event from 'vendors/Event';

// Styles
import './NavPatientList.scss';

const NavPatientList = ({
    patientList, data
}) => {

    /**
     * 列表的数据
     */
    const listData = useMemo(() => {
        return data || patientList;
    }, [
        data, patientList
    ]);

    return (
        <div className="nav-patient-list"
             onWheel={Event.preventContainerScroll}>
            {
                listData?.map((patient, index) =>
                    <NavPatientListItem key={index}
                                        patient={patient}/>
                )
            }
        </div>
    );

};

NavPatientList.propTypes = {
    patientList: PropTypes.array,
    data: PropTypes.array
};

export default connect(state => ({
    patientList: state.patients.list
}))(NavPatientList);
