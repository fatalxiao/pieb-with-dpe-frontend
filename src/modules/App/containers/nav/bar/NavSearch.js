/**
 * @file NavSearch.js
 */

import React, {useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import Paper from 'alcedo-ui/Paper';
import TextField from 'alcedo-ui/TextField';
import NavPatientList from '../patients/NavPatientList';

// Vendors
import classNames from 'classnames';

// Styles
import './NavSearch.scss';

const NavSearch = ({
    visible, patientList,
    onRequestClose
}) => {

    /**
     * 过滤的值
     */
    const [filterValue, setFilterValue] = useState('');

    /**
     * 根据 filter value 返回数据
     * @type {Array}
     */
    const data = useMemo(() => {
        return filterValue ?
            patientList ?
                patientList.filter(item => item?.id?.includes(filterValue) || item?.name?.includes(filterValue))
                :
                []
            :
            patientList;
    }, [
        filterValue, patientList
    ]);

    /**
     * 处理 filter 变更
     * @type {function(*=): void}
     */
    const handleFilterChange = useCallback(nextFilterValue => {
        setFilterValue(nextFilterValue);
    }, []);

    return (
        <div className={classNames('nav-search-wrapper', {
            hidden: !visible
        })}>
            <div className="nav-search-modal"
                 onClick={onRequestClose}/>
            <Paper className="nav-search"
                   nonRounded={true}
                   depth={6}>
                <div className="nav-search-content">
                    <TextField className="nav-search-field"
                               value={filterValue}
                               placeholder="Search"
                               onChange={handleFilterChange}/>
                    {
                        data?.length > 0 ?
                            <NavPatientList data={data}/>
                            :
                            <div className="no-patient-found">
                                No Patient Found
                            </div>
                    }
                </div>
            </Paper>
        </div>
    );

};

NavSearch.propTypes = {

    patientList: PropTypes.array,
    visible: PropTypes.bool,

    onRequestClose: PropTypes.func

};

export default connect(state => ({
    patientList: state.patients.list
}))(NavSearch);
