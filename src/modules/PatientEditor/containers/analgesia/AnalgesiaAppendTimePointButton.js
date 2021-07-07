/**
 * @file AnalgesiaAppendTimePointButton.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import AnchorButton from 'alcedo-ui/AnchorButton';

// Styles
import './AnalgesiaAppendTimePointButton.scss';

const AnalgesiaAppendTimePointButton = ({
    dispatch
}) => {

    /**
     * 追加时间节点
     * @type {(function(): void)|*}
     */
    const appendTimePoint = useCallback(() => {
        dispatch?.({
            type: 'analgesia/appendTimePoint'
        });
    }, [
        dispatch
    ]);

    return (
        <AnchorButton className="analgesia-append-time-point-button"
                      value="Append Time Point"
                      onClick={appendTimePoint}>
            <i className="fal fa-chevron-down down-icon"/>
        </AnchorButton>
    );

};

AnalgesiaAppendTimePointButton.propTypes = {
    dispatch: PropTypes.func
};

export default connect()(AnalgesiaAppendTimePointButton);
