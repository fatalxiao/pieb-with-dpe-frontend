/**
 * @file StepAction.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import FlatButton from 'alcedo-ui/FlatButton';
import RaisedButton from 'alcedo-ui/RaisedButton';

// Statics
import Theme from 'alcedo-ui/Theme';

// Styles
import 'components/StepAction/index.scss';

const StepAction = ({
    isFirst, isLast,
    onPrev, onNext
}) => (
    <div className="step-action">

        {
            isFirst ?
                null
                :
                <FlatButton className="previous-button"
                            value="Previous"
                            iconCls="icon-back"
                            onClick={onPrev}/>
        }

        <RaisedButton className="continue-button"
                      theme={Theme.SUCCESS}
                      value={isLast ? 'DONE' : 'SAVE and CONTINUE'}
                      onClick={onNext}/>

    </div>
);

StepAction.propTypes = {

    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,

    onPrev: PropTypes.func,
    onNext: PropTypes.func

};

StepAction.defaultProps = {
    isFirst: false,
    isLast: false
};

export default StepAction;
