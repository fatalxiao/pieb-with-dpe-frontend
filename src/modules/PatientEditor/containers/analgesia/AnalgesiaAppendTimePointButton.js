/**
 * @file AnalgesiaAppendTimePointButton.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as patientEditorActions from 'modules/PatientEditor/reduxes/actions';

// Components
import AnchorButton from 'alcedo-ui/AnchorButton';

// Styles
import './AnalgesiaAppendTimePointButton.scss';

const AnalgesiaAppendTimePointButton = ({
    appendTimePoint
}) => (
    <AnchorButton className="analgesia-append-time-point-button"
                  value="Append Time Point"
                  onClick={appendTimePoint}>
        <i className="fal fa-chevron-down down-icon"/>
    </AnchorButton>
);

AnalgesiaAppendTimePointButton.propTypes = {
    appendTimePoint: PropTypes.func
};

export default connect(null, dispatch => bindActionCreators({
    appendTimePoint: patientEditorActions.appendTimePoint
}, dispatch))(AnalgesiaAppendTimePointButton);
