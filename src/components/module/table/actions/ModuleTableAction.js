/**
 * @file ModuleTableAction.js
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'customized/CustomizedIconButton';

// Vendors
import classNames from 'classnames';
import {enumerateValue} from 'vendors/Util';

// Styles
import './ModuleTableAction.scss';

class ModuleTableAction extends Component {

    static Theme = IconButton.Theme;

    constructor(props) {
        super(props);
    }

    render() {

        const {className, tip, ...restProps} = this.props;

        return (
            <TipProvider className="module-table-action-tip"
                         tipContent={tip}>
                <IconButton {...restProps}
                            className={classNames('module-table-action', {
                                [className]: className
                            })}/>
            </TipProvider>
        );

    }
}

ModuleTableAction.propTypes = {

    theme: PropTypes.oneOf(enumerateValue(IconButton.Theme)),
    className: PropTypes.string,

    tip: PropTypes.string

};

ModuleTableAction.defaultProps = {
    theme: IconButton.Theme.HIGHLIGHT
};

export default ModuleTableAction;
