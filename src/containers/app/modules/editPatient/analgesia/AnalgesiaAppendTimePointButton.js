/**
 * @file AnalgesiaAppendTimePointButton.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import AnchorButton from 'alcedo-ui/AnchorButton';

// Styles
import './AnalgesiaAppendTimePointButton.scss';

const AnalgesiaTable = ({
    appendTimePoint
}) => (
    <AnchorButton className="analgesia-append-time-point-button"
                  value="Append Time Point"
                  onClick={appendTimePoint}>
        <i className="fal fa-chevron-down down-icon"/>
    </AnchorButton>
);

AnalgesiaTable.propTypes = {
    appendTimePoint: PropTypes.func
};

export default connect(null, dispatch => bindActionCreators({
    appendTimePoint: actions.appendTimePoint
}, dispatch))(AnalgesiaTable);
