/**
 * @file sitemap.js
 */

// Sitemaps
import appSitemap from 'modules/App/sitemap';
import patientListSitemap from 'modules/PatientList/sitemap';
import patientEditorSitemap from 'modules/PatientEditor/sitemap';

/**
 * sitemap root 标志
 * @type {string}
 */
const rootSymbol = 'root';

/**
 * 返回 sitemap
 * @param state
 * @returns {*}
 */
export function sitemap(state) {
    return {
        [rootSymbol]: true,
        children: [{

            // App
            ...appSitemap(),

            children: [

                // Patient List
                patientListSitemap(),

                // Patient Editor
                patientEditorSitemap()

            ]
        }]
    };
}

/**
 * 根据 path name 获取 sitemap 的下钻路径
 * @param pathName
 * @param state
 * @returns {[*]|*}
 */
export function getPath(pathName, state) {

    if (!pathName) {
        return;
    }

    return traverseData(sitemap(state), pathName);

}

/**
 * 遍历 sitemap 树
 * @param node
 * @param pathName
 * @param index
 * @returns {[*]|*|*[]}
 */
export function traverseData(node, pathName, index) {

    if (!node || node.length < 1 || !pathName) {
        return;
    }

    if (new RegExp(`^${node.route}(\\/[\\w]+)?$`).test(pathName)) {
        return [node];
    }

    if (node.children && node.children.length > 0) {

        for (let i = 0, len = node.children.length; i < len; i++) {

            // traverse child node
            const path = traverseData(node.children[i], pathName, i);

            // if finded in child node
            if (path) {

                if (node[rootSymbol]) {
                    return path;
                }

                path.unshift(node);

                return path;

            }

        }
    }

}
