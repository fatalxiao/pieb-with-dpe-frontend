/**
 * @file ModuleTableActionButtonRadioGroup.js
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import ButtonRadioGroup from 'alcedo-ui/ButtonRadioGroup';

// Vendors
import classNames from 'classnames';

// Styles
import './ModuleTableActionButtonRadioGroup.scss';

const ModuleTableActionButtonRadioGroup = ({
    className, tipContent,
    onChange,
    ...restProps
}) => {

    const

        /**
         * tip ref
         * @type {React.MutableRefObject<undefined>}
         */
        tipRef = useRef(),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleChange = useCallback((...args) => {

            // tip content 可能改变，在点击后重新计算位置
            // setTimeout(() => tipRef?.current?.resetPosition?.(), 0);

            onChange?.(...args);

        }, [
            // tipRef,
            onChange
        ]);

    return (
        <TipProvider ref={tipRef}
                     tipContent={tipContent}
                     position={TipProvider.Position.BOTTOM}>
            <ButtonRadioGroup {...restProps}
                              className={classNames('module-table-action-button-radio-group', {
                                  [className]: className
                              })}
                              onChange={handleChange}/>
        </TipProvider>
    );

};

ModuleTableActionButtonRadioGroup.propTypes = {

    className: PropTypes.string,
    tipContent: PropTypes.any,

    onChange: PropTypes.func

};

export default ModuleTableActionButtonRadioGroup;
