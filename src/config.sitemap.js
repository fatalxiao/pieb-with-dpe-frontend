/**
 * @file config.sitemap.js
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
            name: 'DPE Manager',
            route: '/app',
            children: [{
                name: 'Patient List',
                route: '/app/patient-list'
            }, {
                name: 'Patient',
                route: '/app/patient',
                children: [{
                    name: 'Patient Information',
                    route: '/app/patient/info'
                }, {
                    name: 'Analgesia Data',
                    route: '/app/patient/analgesia'
                }, {
                    name: 'Observal Data',
                    route: '/app/patient/observal'
                }]
            }]
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
