/**
 * @file NavPatientsPopover.js
 */

import React, {useRef, useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import IconButton from 'alcedo-ui/IconButton';
import Popover from 'alcedo-ui/Popover';
import PatientList from './NavPatientList';

// Vendors
import {findDOMNode} from 'react-dom';

// Styles
import 'scss/containers/app/nav/patients/NavPatientPopover.scss';

const NavPatientsPopover = ({
    isFold,
    routerPush
}) => {

    const

        /**
         * all Patient Button 的 ref
         * @type {React.MutableRefObject<undefined>}
         */
        allPatientButtonRef = useRef(),

        /**
         * 是否显示 pop 的标志
         * @type {React.MutableRefObject<undefined>}
         */
        [popVisible, setPopVisible] = useState(false),

        /**
         * all Patient Button 的 element
         * @type {null}
         */
        allPatientButtonEl = useMemo(() =>
                findDOMNode(allPatientButtonRef?.current),
            [allPatientButtonRef]
        ),

        /**
         * 显示 pop
         * @type {function(): void}
         */
        showPop = useCallback(() =>
                setPopVisible(true),
            []
        ),

        /**
         * 隐藏 pop
         * @type {function(): void}
         */
        hidePop = useCallback(() =>
                setPopVisible(false),
            []
        ),

        /**
         * 跳转到列表页
         * @type {function(): *}
         */
        goToList = useCallback(() =>
                routerPush?.('/app/patient-list'),
            [routerPush]
        );

    return (
        <div className="nav-patient-popover-wrapper">

            <IconButton ref={allPatientButtonRef}
                        className="nav-patient-popover-item"
                        iconCls="icon-list"
                        onMouseOver={showPop}
                        onClick={goToList}/>

            <Popover className="nav-patient-popover"
                     visible={isFold && popVisible}
                     triggerEl={allPatientButtonEl}
                     position={Popover.Position.RIGHT_TOP}
                     hasTriangle={false}
                     isTriggerPositionFixed={true}
                     onRequestClose={hidePop}>
                <PatientList/>
            </Popover>

        </div>
    );

};

NavPatientsPopover.propTypes = {

    isFold: PropTypes.bool,

    routerPush: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientsPopover);
