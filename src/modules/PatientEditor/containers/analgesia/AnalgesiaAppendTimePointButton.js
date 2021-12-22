/**
 * @file AnalgesiaAppendTimePointButton.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

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

export default connect(null, dispatch => bindModelActionCreators({
    appendTimePoint: 'analgesia/appendTimePoint'
}, dispatch))(AnalgesiaAppendTimePointButton);
