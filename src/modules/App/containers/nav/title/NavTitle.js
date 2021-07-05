/**
 * @file NavTitle.js
 */

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import {NavLink} from 'react-router-dom';
import Crumbs from 'alcedo-ui/Crumbs';

// Vendors
import {getPath} from 'src/config.sitemap';

// Styles
import './NavTitle.scss';

const NavTitle = ({state}) => {

    /**
     * 获取当前 location 的 pathname
     * @type {string}
     */
    const pathName = location.pathname;

    /**
     * 根据 pathname 去 sitemap 里计算出 path
     * @type {*[]}
     */
    const navPath = useMemo(() => {
        return getPath(pathName, state);
    }, [
        pathName, state
    ]);

    return (
        <div className="nav-title">
            {
                navPath?.length > 0 ?
                    <div className="nav-title-crumbs-wrapper">

                        <i className="icon-location-pin nav-title-crumbs-icon"/>

                        <Crumbs className="nav-title-crumbs"
                                data={navPath}
                                separator="/"
                                itemRenderer={(item, index) => index === navPath.length - 1 ?
                                    <div className="nav-title-crumb">
                                        {item.name}
                                    </div>
                                    :
                                    <NavLink className="nav-title-crumb nav-title-link"
                                             to={item.route}>
                                        {item.name}
                                    </NavLink>
                                }/>

                    </div>
                    :
                    null
            }
        </div>
    );

};

NavTitle.propTypes = {
    state: PropTypes.object
};

export default connect(state => ({
    state
}))(NavTitle);
