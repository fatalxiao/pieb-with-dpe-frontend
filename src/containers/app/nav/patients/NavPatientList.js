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
import 'scss/containers/app/nav/patients/NavPatientList.scss';

const NavPatientList = ({
    patientList, data
}) => {

    const

        /**
         * 列表的数据
         */
        listData = useMemo(() => data || patientList, [data, patientList]);

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
